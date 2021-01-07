package main

import (
	"fmt"
	"log"
	"math/rand"
	"os"
	"time"

	"github.com/stefanoschrs/buttes-chaumont.fr/be/internal/database"

	"github.com/gin-gonic/gin"
	"github.com/stefanoschrs/buttes-chaumont.fr/be/internal/http"
	"github.com/stefanoschrs/buttes-chaumont.fr/be/utils"
)

func printIntro() {
	i := "\033[36;1m"
	i2 := "\033[34;1m"
	d := "\033[0m"
	fmt.Println(i + `Buttes ` + i2 + `Chaumont` + d)
	fmt.Println()
}

func main() {
	printIntro()

	// ------------------------- Initialize Config ------------------------- //
	if err := utils.LoadConfig(); err != nil {
		log.Fatal("config.LoadConfig", err)
	}

	// ------------------------ Initialize Database ------------------------ //
	db, err := database.Init()
	if err != nil {
		log.Fatal("database.Init", err)
	}

	// ----------------------- Initialize Random Seed ---------------------- //
	rand.Seed(time.Now().UTC().UnixNano())

	// -------------------------------- Gin -------------------------------- //
	router := http.Init()

	http.SetMiddleware(router)
	router.Use(func(c *gin.Context) {
		c.Set("db", db)
	})

	http.SetRoutes(router)

	log.Printf("Listening on :%s...\n", os.Getenv("PORT"))
	if err := router.Run(); err != nil {
		log.Fatal(err)
	}
}
