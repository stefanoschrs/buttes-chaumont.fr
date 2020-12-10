package types

import "gorm.io/gorm"

type Athlete struct {
	gorm.Model

	Name     string `json:"name"`
	Sex      string `json:"sex"`
	ImageUrl string `json:"imageUrl"`
}

type Segment struct {
	gorm.Model

	Name string `json:"name"`
}

type Entry struct {
	SegmentId uint `json:"segmentId"`
	AthleteId uint `json:"athleteId"`
	PR        uint `json:"pr"`
	Efforts   uint `json:"efforts"`
}

// FE
type SegmentWithEntries struct {
	SegmentId   uint   `json:"segmentId"`
	SegmentName string `json:"segmentName"`

	Entries []SegmentWithEntriesEntry `json:"entries"`
}
type SegmentWithEntriesEntry struct {
	Name     string `json:"name"`
	Sex      string `json:"sex"`
	ImageUrl string `json:"imageUrl"`
	PR       uint   `json:"pr"`
	Efforts  uint   `json:"efforts"`
}
