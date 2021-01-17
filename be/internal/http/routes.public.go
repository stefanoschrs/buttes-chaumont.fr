package http

import (
	"log"
	"net/http"
	"os"

	"github.com/stefanoschrs/buttes-chaumont.fr/be/internal/strava"
	"github.com/stefanoschrs/buttes-chaumont.fr/be/utils"

	"github.com/gin-gonic/gin"
)

func GetHealth(c *gin.Context) {
	c.Status(http.StatusOK)
}

func GetSegments(c *gin.Context) {
	db := utils.ExtractDB(c)

	segments, err := db.GetSegmentsWithEntries()
	if err != nil {
		log.Println("db.GetSegmentsWithEntries", err)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, segments)
}

func GetStravaCallback(c *gin.Context) {
	db := utils.ExtractDB(c)

	code := c.Query("code")

	client := strava.New()
	athlete, err := client.Authorize(code)
	if err != nil {
		log.Println("client.Authorize", err)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	err = db.CreateAthlete(athlete)
	if err != nil {
		log.Println("db.CreateAthlete", err)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	segments, err := db.GetSegments()
	if err != nil {
		log.Println("db.GetSegments", err)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	for _, segment := range segments {
		pr, efforts, err2 := client.GetSegmentEfforts(segment.ID)
		if err2 != nil {
			log.Println("client.GetSegmentEfforts", err2)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		err2 = db.UpdateAthleteSegmentStats(athlete.ID, segment.ID, pr, efforts)
		if err2 != nil {
			log.Println("db.UpdateAthleteSegmentStats", err2)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}
	}

	c.Redirect(http.StatusFound, os.Getenv("feUrl"))
}
