package structures

import (
	"github.com/jinzhu/gorm"
)

type UserBooks struct {
	gorm.Model
	Uid    string `json:"userid"`
	BookId string `json:"bookid"`
	Book   []Book `gorm:"foreignkey:BId;association_foreignkey:BookId"`
	Dues   int    `json:"dues"`
}

func NewUserBook(Uid, BookId string) *UserBooks {

	return &UserBooks{

		Uid:    Uid,
		BookId: BookId,
		Dues:   0,
	}
}
