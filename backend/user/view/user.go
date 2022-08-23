package view

import (
	"api/structures"
	"fmt"

	"github.com/jinzhu/gorm"
)

var globaldb *gorm.DB

func PassDB(db *gorm.DB) {
	globaldb = db

}

func GetAll() []structures.User {
	var Alluser []structures.User
	globaldb.Debug().Find(&Alluser)
	fmt.Println(len(Alluser))
	for i := 0; i < len(Alluser); i++ {
		if Alluser[i].DeletedAt == nil {
			fmt.Println(Alluser[i], Alluser[i].CreatedAt)
		}
	}
	return Alluser
}
