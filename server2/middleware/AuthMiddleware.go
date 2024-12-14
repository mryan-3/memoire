package middleware

import (
	"net/http"

	"github.com/codedwells/MediLink/database"
	"github.com/codedwells/MediLink/models"
	"github.com/codedwells/MediLink/utils"
	"github.com/gofiber/fiber/v2"
)

// Allow only authenticated admins
func AdminAuth(c *fiber.Ctx) error {
	// Get jwt from cookie
	userJwt := c.Cookies("admin")

	if userJwt == "" {
		return c.Status(http.StatusUnauthorized).JSON(&fiber.Map{
			"status":  "error",
			"message": "Unauthorized",
		})
	}

	// Verify jwt
	userId, isValid, err := utils.VerifyJwtToken(userJwt)

	if err != nil || !isValid {
		return c.Status(http.StatusUnauthorized).JSON(&fiber.Map{
			"status":  "error",
			"message": "Unauthorized",
		})
	}

	var user models.Admin
	result := database.DB.Db.First(&user, "ID=?", userId["user_id"])

	if result.Error != nil {
		return c.Status(http.StatusUnauthorized).JSON(&fiber.Map{
			"status":  "error",
			"message": "Unauthorized",
		})

	}

	// Set user id in context
	c.Locals("userId", user.ID.String())

	return c.Next()

}

// Allow only authenticated doctors
func DoctorAuth(c *fiber.Ctx) error {
	// Get jwt from cookie
	userJwt := c.Cookies("doc")

	if userJwt == "" {
		return c.Status(http.StatusUnauthorized).JSON(&fiber.Map{
			"status":  "error",
			"message": "Unauthorized",
		})
	}

	// Verify jwt
	userId, isValid, err := utils.VerifyJwtToken(userJwt)

	if err != nil || !isValid {
		return c.Status(http.StatusUnauthorized).JSON(&fiber.Map{
			"status":  "error",
			"message": "Unauthorized",
		})
	}

	var user models.Doctor
	result := database.DB.Db.First(&user, "ID=?", userId["user_id"])

	if result.Error != nil {
		return c.Status(http.StatusUnauthorized).JSON(&fiber.Map{
			"status":  "error",
			"message": "Unauthorized",
		})

	}

	// Set user id in context
	c.Locals("userId", user.ID.String())

	return c.Next()
}

// Allowing only authenticated student
func PatientAuth(c *fiber.Ctx) error {
	// Get jwt from cookie
	userJwt := c.Cookies("patient")

	if userJwt == "" {
		return c.Status(http.StatusUnauthorized).JSON(&fiber.Map{
			"status":  "error",
			"message": "Unauthorized",
		})
	}

	// Verify jwt
	userId, isValid, err := utils.VerifyJwtToken(userJwt)

	if err != nil || !isValid {
		return c.Status(http.StatusUnauthorized).JSON(&fiber.Map{
			"status":  "error",
			"message": "Unauthorized",
		})
	}

	var user models.Patient
	result := database.DB.Db.First(&user, "ID=?", userId["user_id"])

	if result.Error != nil {
		return c.Status(http.StatusUnauthorized).JSON(&fiber.Map{
			"status":  "error",
			"message": "Unauthorized",
		})

	}

	// Set user id in context
	c.Locals("userId", user.ID.String())

	return c.Next()
}

// Allowing either admin or
func AdminOrPatientAuth(c *fiber.Ctx) error {
	// Get jwt from cookie
	userJwt := c.Cookies("admin")

	if userJwt == "" {
		// Get jwt from cookie
		userJwt = c.Cookies("patient")

		if userJwt == "" {
			return c.Status(http.StatusUnauthorized).JSON(&fiber.Map{
				"status":  "error",
				"message": "Unauthorized",
			})
		}

		// Verify jwt
		userId, isValid, err := utils.VerifyJwtToken(userJwt)

		if err != nil || !isValid {
			return c.Status(http.StatusUnauthorized).JSON(&fiber.Map{
				"status":  "error",
				"message": "Unauthorized",
			})
		}

		var user models.Student
		result := database.DB.Db.First(&user, "ID=?", userId["user_id"])

		if result.Error != nil {
			return c.Status(http.StatusUnauthorized).JSON(&fiber.Map{
				"status":  "error",
				"message": "Unauthorized",
			})

		}

		// Set user id in context
		c.Locals("userId", user.ID.String())
		c.Locals("role", user.Role)

		return c.Next()
	}

	// Verify jwt
	userId, isValid, err := utils.VerifyJwtToken(userJwt)

	if err != nil || !isValid {
		return c.Status(http.StatusUnauthorized).JSON(&fiber.Map{
			"status":  "error",
			"message": "Unauthorized",
		})
	}

	var user models.Admin
	result := database.DB.Db.First(&user, "ID=?", userId["user_id"])

	if result.Error != nil {
		return c.Status(http.StatusUnauthorized).JSON(&fiber.Map{
			"status":  "error",
			"message": "Unauthorized",
		})

	}

	// Set user id in context
	c.Locals("userId", user.ID.String())

	return c.Next()
}
