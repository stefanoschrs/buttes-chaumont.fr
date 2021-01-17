package strava

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"os"

	"github.com/stefanoschrs/buttes-chaumont.fr/be/types"

	"github.com/go-resty/resty/v2"
	"gorm.io/gorm"
)

type Strava struct {
	*resty.Client
}

func New() (s Strava) {
	s.Client = resty.New()

	return
}

func (s Strava) Authorize(code string) (athlete types.Athlete, err error) {
	formData := map[string]string{
		"client_id":     os.Getenv("stravaClientId"),
		"client_secret": os.Getenv("stravaClientSecret"),
		"code":          code,
		"grant_type":    "authorization_code",
	}

	res, err := s.R().
		SetFormData(formData).
		Post("https://www.strava.com/oauth/token")
	if err != nil {
		return
	}
	if res.StatusCode() != http.StatusOK {
		err = errors.New(res.Status())
		return
	}

	var body struct {
		AccessToken string `json:"access_token"`
		Athlete     struct {
			Id        uint   `json:"id"`
			FirstName string `json:"firstname"`
			LastName  string `json:"lastname"`
			Sex       string `json:"sex"`
			Profile   string `json:"profile"`
		} `json:"athlete"`
	}
	err = json.Unmarshal(res.Body(), &body)
	if err != nil {
		return
	}

	athlete = types.Athlete{
		Model: gorm.Model{
			ID: body.Athlete.Id,
		},
		Name:     body.Athlete.FirstName + " " + body.Athlete.LastName,
		Sex:      body.Athlete.Sex,
		ImageUrl: body.Athlete.Profile,
	}

	s.SetHeader("Authorization", "Bearer "+body.AccessToken)

	return
}

func (s Strava) GetSegmentEfforts(segmentId uint) (pr uint, efforts uint, err error) {
	res, err := s.R().
		Get(fmt.Sprintf("https://www.strava.com/api/v3/segments/%d", segmentId))
	if err != nil {
		return
	}
	if res.StatusCode() != http.StatusOK {
		err = errors.New(res.Status())
		return
	}

	var segmentBody struct {
		AthleteSegmentStats struct {
			PrElapsedTime uint `json:"pr_elapsed_time"`
			EffortCount   uint `json:"effort_count"`
		} `json:"athlete_segment_stats"`
	}
	err = json.Unmarshal(res.Body(), &segmentBody)
	if err != nil {
		return
	}

	pr = segmentBody.AthleteSegmentStats.PrElapsedTime
	efforts = segmentBody.AthleteSegmentStats.EffortCount
	return
}
