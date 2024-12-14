package database

import (
	"fmt"
	"github.com/codedwells/MediLink/models"
	"gorm.io/gorm"
	"log"
)

func MigrateDatabase(DB *gorm.DB) {
	fmt.Println("Running migration")

	err := DB.AutoMigrate(
		&models.Patient{},
		&models.Doctor{},
        &models.Admin{},
        &models.Appointment{},
        &models.Availability{},
        &models.Prescription{},
        &models.MedicalHistory{},
	)

	if err != nil {
        log.Fatalf("Migration failed: %v", err)
	} else {
		fmt.Println("Migration ran!")
	}
}
