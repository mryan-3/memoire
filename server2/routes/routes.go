package routes

import (
	adminControllers "github.com/codedwells/MediLink/controllers/admin"
	"github.com/codedwells/MediLink/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetUpRoutes(app *fiber.App) {
	api := app.Group("/api")

	// Version 1
	v1 := api.Group("/v1")

	// Admin routes
	admin := v1.Group("/admin")
	admin.Post("/signup", adminControllers.CreateAdmin)
	admin.Post("/login", adminControllers.LoginAdmin)
	admin.Get("/refresh", middleware.AdminAuth, adminControllers.RefreshAdminAccess)
	admin.Put("/email", middleware.AdminAuth, adminControllers.UpdateEmail)
	admin.Put("/password", middleware.AdminAuth, adminControllers.UpdatePassword)
}
