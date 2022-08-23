package structures

import (
	"github.com/google/uuid"
	"github.com/jinzhu/gorm"
)

type Book struct {
	gorm.Model
	BId      string `json:"id"  `
	Name     string `json:"name"`
	Author   string `json:"author"`
	Quantity int    `json:"quantity"`
}

func NewBook(Name, Author string, Total int) *Book {
	uuid := uuid.New()
	return &Book{
		BId:      uuid.String(),
		Name:     Name,
		Author:   Author,
		Quantity: Total,
	}
}
