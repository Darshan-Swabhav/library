package structures

import (
	"github.com/google/uuid"
	"github.com/jinzhu/gorm"
)

type User struct {
	gorm.Model
	Uid      string `json:"uid"`
	UserName string `json:"username"`
	FName    string `json:"fname"`
	LName    string `json:"lname"`
	PassWord string `json:"password"`
	Address  string `json:"address"`
	// Gender   *bool       `json:"gender"`
	Number  int64       `json:"number"`
	Books   []UserBooks `gorm:"foreignkey:Uid;association_foreignkey:Uid"`
	IsAdmin *bool       `json:"isadmin"`
	Dues    int64       `json:"dues"`
}

func NewUser(UserName, FName, Lname, PassWord, Address string, IsAdmin bool, Number int64, Dues int64) *User {
	uuid := uuid.New()
	// gender := Gender
	isAdmin := IsAdmin
	return &User{
		Uid:      uuid.String(),
		UserName: UserName,
		FName:    FName,
		LName:    Lname,
		PassWord: PassWord,
		Address:  Address,
		Number:   Number,
		// Gender:   &gender,
		IsAdmin: &isAdmin,
		Dues:    Dues,
	}
}
