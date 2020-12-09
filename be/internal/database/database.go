package database

import (
	"os"

	"github.com/stefanoschrs/buttes-chaumont.fr/be/types"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type DB struct {
	*gorm.DB
}

func Init() (db DB, err error) {
	rawDB, err := gorm.Open(sqlite.Open(os.Getenv("dbFile")), &gorm.Config{})
	if err != nil {
		return
	}

	db.DB = rawDB

	// Migrate
	err = db.AutoMigrate(
		&types.Athlete{},
		&types.Segment{},
		&types.Entry{},
	)
	if err != nil {
		return
	}

	// Seed
	segments := map[uint]string{
		26676957: "5K des Buttes-Chaumont 🏃‍♂️",
		26676947: "10K des Buttes-Chaumont 🏃‍♂️",
		26676910: "Semi Marathon des Buttes-Chaumont 🏃‍♂️",
		26676892: "Marathon des Buttes-Chaumont 🏃‍♂️",
	}
	for id, name := range segments {
		res := db.
			Clauses(clause.OnConflict{DoNothing: true}).
			Create(&types.Segment{
				Model: gorm.Model{
					ID: id,
				},
				Name: name,
			})
		if res.Error != nil {
			err = res.Error
			return
		}
	}

	return
}

func (db DB) CreateAthlete(athlete types.Athlete) (err error) {
	res := db.
		Clauses(clause.OnConflict{DoNothing: true}).
		Create(&athlete)
	if res.Error != nil {
		err = res.Error
		return
	}

	return
}

func (db DB) UpdateAthleteEfforts(athleteId uint, segmentId uint, efforts uint) (err error) {
	entry := types.Entry{
		SegmentId: segmentId,
		AthleteId: athleteId,
		Efforts:   efforts,
	}
	res := db.
		Where(entry).
		Assign(types.Entry{
			Efforts: efforts,
		}).
		FirstOrCreate(&entry)
	if res.Error != nil {
		err = res.Error
		return
	}

	return
}

func (db DB) GetSegments() (segments []types.Segment, err error) {
	res := db.
		Find(&segments)
	if res.Error != nil {
		err = res.Error
		return
	}

	return
}

func (db DB) GetSegmentsWithEntries() (segments []types.SegmentWithEntries, err error) {
	var rows []struct {
		SegmentId   uint   `json:"segmentId"`
		SegmentName string `json:"segmentName"`

		Efforts uint `json:"efforts"`

		types.Athlete
	}
	res := db.
		Unscoped().
		Table("segments s").
		Select("s.id segment_id, s.name segment_name, e.efforts, a.*").
		Joins("LEFT JOIN entries e ON e.segment_id = s.id").
		Joins("LEFT JOIN athletes a on e.athlete_id = a.id").
		Order("e.efforts DESC").
		Find(&rows)
	if res.Error != nil {
		err = res.Error
		return
	}

	segmentsMap := map[uint]types.SegmentWithEntries{}
	for _, row := range rows {
		v, ok := segmentsMap[row.SegmentId]
		if !ok {
			v = types.SegmentWithEntries{
				SegmentId:   row.SegmentId,
				SegmentName: row.SegmentName,
				Entries:     []types.SegmentWithEntriesEntry{},
			}
		}

		if row.Efforts > 0 {
			v.Entries = append(v.Entries, types.SegmentWithEntriesEntry{
				Name:     row.Name,
				Sex:      row.Sex,
				ImageUrl: row.ImageUrl,
				Efforts:  row.Efforts,
			})
		}

		segmentsMap[row.SegmentId] = v
	}

	segments = []types.SegmentWithEntries{}
	for _, value := range segmentsMap {
		segments = append(segments, value)
	}

	return
}
