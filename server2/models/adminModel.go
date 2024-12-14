package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Admin model
type Admin struct {
	gorm.Model

	ID       uuid.UUID `json:"ID" gorm:"type:uuid;default:gen_random_uuid();primary_key"`
	Name     string    `json:"name" gorm:"type:varchar(255);not null"`
	Email    string    `json:"email" gorm:"unique;not null"`
	Password string    `json:"-" gorm:"not null"` // "-" exclude field from json response
}

