package utils

import (
	"os"

	"github.com/stefanoschrs/buttes-chaumont.fr/be/internal/database"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func LoadConfig() error {
	err := LoadEnv()
	if err != nil {
		return err
	}

	return nil
}

func LoadEnv() (err error) {
	p := os.Getenv("ENV")
	if p == "" {
		p = ".env"
	}

	return godotenv.Load(p)
}

func ExtractDB(c *gin.Context) database.DB {
	dbContext, _ := c.Get("db")
	return dbContext.(database.DB)
}
