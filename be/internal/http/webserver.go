package http

import (
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func Init() *gin.Engine {
	router := gin.New()
	if os.Getenv("GIN_MODE") != "" {
		gin.SetMode(os.Getenv("GIN_MODE"))
	}

	return router
}

func SetMiddleware(router *gin.Engine) {
	router.Use(gin.Recovery())
	router.Use(loggerMiddleware())
	router.Use(corsMiddleware)
}

func SetRoutes(router *gin.Engine) {
	// CORS
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowCredentials = true
	corsConfig.AllowOrigins = []string{}
	if gin.IsDebugging() {
		corsConfig.AllowOrigins = append(corsConfig.AllowOrigins,
			"http://localhost:3000",
		)
	}

	// Public routes: /
	apiPublic := router.Group("/")
	apiPublic.Use(cors.New(corsConfig))
	{
		apiPublic.GET("/health", GetHealth)

		apiPublic.GET("/segments", GetSegments)

		apiPublic.GET("/strava/callback", GetStravaCallback)
	}
}
