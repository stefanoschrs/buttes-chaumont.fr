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

func NewClient() (s Strava) {
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

	// {
	//    "token_type": "Bearer",
	//    "expires_at": 1607266503,
	//    "expires_in": 14904,
	//    "refresh_token": "xxx",
	//    "access_token": "yyy",
	//    "athlete": {
	//        "id": 1,
	//        "username": "stefanoschrs",
	//        "resource_state": 2,
	//        "firstname": "Stefanos",
	//        "lastname": "Chrs 🇨🇾",
	//        "city": "Nantes",
	//        "state": "Pays de la Loire",
	//        "country": "France",
	//        "sex": "M",
	//        "premium": false,
	//        "summit": false,
	//        "created_at": "2017-02-17T12:40:21Z",
	//        "updated_at": "2020-06-06T17:24:51Z",
	//        "badge_type_id": 0,
	//        "profile_medium": "https://dgalywyr863hv.cloudfront.net/pictures/athletes/19964316/10516980/3/medium.jpg",
	//        "profile": "https://dgalywyr863hv.cloudfront.net/pictures/athletes/19964316/10516980/3/large.jpg",
	//        "friend": null,
	//        "follower": null
	//    }
	//}

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
		Model:    gorm.Model{
			ID: body.Athlete.Id,
		},
		Name:     body.Athlete.FirstName + " " + body.Athlete.LastName,
		Sex:      body.Athlete.Sex,
		ImageUrl: body.Athlete.Profile,
	}

	s.SetHeader("Authorization", "Bearer " + body.AccessToken)

	return
}

func (s Strava) GetSegmentEfforts(segmentId uint) (efforts uint, err error) {
	res, err := s.R().
		Get(fmt.Sprintf("https://www.strava.com/api/v3/segments/%d", segmentId))
	if err != nil {
		return
	}
	if res.StatusCode() != http.StatusOK {
		err = errors.New(res.Status())
		return
	}

	// {
	//    "id": 5286734,
	//    "resource_state": 3,
	//    "name": "Buttes Chaumont Clockwise - Southern Gate",
	//    "activity_type": "Run",
	//    "distance": 2268.4,
	//    "average_grade": 0,
	//    "maximum_grade": 12.1,
	//    "elevation_high": 124.8,
	//    "elevation_low": 96.6,
	//    "start_latlng": [
	//        48.876913,
	//        2.380523
	//    ],
	//    "end_latlng": [
	//        48.876925,
	//        2.380533
	//    ],
	//    "elevation_profile": "https://d3o5xota0a1fcr.cloudfront.net/v6/charts/TPQNR7Y7ZQLLLPE322FDCJIGS63CJLSPU6KN547JBFLZFSJ7G3S7BHC6V5GC6H6RGK3ON2YAM2SAOSV37QQXE===",
	//    "start_latitude": 48.876913,
	//    "start_longitude": 2.380523,
	//    "end_latitude": 48.876925,
	//    "end_longitude": 2.380533,
	//    "climb_category": 0,
	//    "city": "Paris",
	//    "state": "IDF",
	//    "country": "France",
	//    "private": false,
	//    "hazardous": false,
	//    "starred": true,
	//    "created_at": "2013-08-27T17:42:49Z",
	//    "updated_at": "2020-12-06T09:01:29Z",
	//    "total_elevation_gain": 38,
	//    "map": {
	//        "id": "s5286734",
	//        "polyline": "ugiiHg}oMLVF^@^Gz@Mb@SX]j@SRSLk@NM?]M[UMOIOOu@IMEAEBKPId@INKZIFS\\_@RKAUSKQSQWIw@MMEWSYMa@e@OKKQISMoACw@U{@O[KGQESKS?KC}@AQEGGKAUSc@c@MSSe@CSMMK[IGGQKk@KSYa@Qe@CWM[UaAQoAAQOa@AO@k@Eq@DmAJq@Nm@Zu@R[HWLQXSZ]n@[b@_@XOd@a@ZONMZc@t@cBR]J_@\\a@ZSFCRFLPDPCZ_@~@It@JdBAd@Fd@BxAHh@FLd@dBLn@Rd@RpBNv@L~C?pACfA?RBFf@~@PP^v@\\f@x@x@ZJ\\VVLL@XAVDd@D`AZd@RNPHN",
	//        "resource_state": 3
	//    },
	//    "effort_count": 29744,
	//    "athlete_count": 2847,
	//    "star_count": 36,
	//    "athlete_segment_stats": {
	//        "pr_elapsed_time": 629,
	//        "pr_date": "2020-10-14",
	//        "pr_activity_id": 4194640218,
	//        "effort_count": 22
	//    },
	//    "xoms": {
	//        "kom": "7:44",
	//        "qom": "9:22",
	//        "destination": {
	//            "href": "strava://segments/5286734/leaderboard",
	//            "type": "overall",
	//            "name": "All-Time"
	//        }
	//    },
	//    "local_legend": {
	//        "athlete_id": 67304183,
	//        "title": "Georges Petrov",
	//        "profile": "https://lh3.googleusercontent.com/a-/AOh14GjjvxM_DEEipB2rUdFBloN1yVa5Lv2GZ-Ccf1Y85qM",
	//        "effort_description": "53 efforts in the last 90 days",
	//        "effort_count": "53",
	//        "effort_counts": {
	//            "overall": "53 efforts",
	//            "female": "36 efforts"
	//        },
	//        "destination": "strava://segments/5286734/local_legend?categories%5B%5D=overall"
	//    }
	//}

	var segmentBody struct {
		AthleteSegmentStats struct {
			EffortCount   uint   `json:"effort_count"`
		} `json:"athlete_segment_stats"`
	}
	err = json.Unmarshal(res.Body(), &segmentBody)
	if err != nil {
		return
	}

	efforts = segmentBody.AthleteSegmentStats.EffortCount
	return
}
