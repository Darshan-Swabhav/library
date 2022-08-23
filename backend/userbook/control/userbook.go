package control

import (
	"api/structures"
	"time"

	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
)

var globaldb *gorm.DB

func PassDB(db *gorm.DB) {
	globaldb = db

}

func New(w http.ResponseWriter, r *http.Request) {
	var NewBook structures.UserBooks
	var allbook []structures.UserBooks
	err := json.NewDecoder(r.Body).Decode(&NewBook)
	fmt.Println("errorr is:", err)
	NewBook.Dues = 0
	globaldb.Debug().Find(&allbook)
	globaldb.Debug().Where("uid= ?", NewBook.Uid).Find(&allbook)

	fmt.Println(NewBook)
	fmt.Println(len(allbook), "all book lenght")
	if len(allbook) < 5 {
		globaldb.Debug().Transaction(func(tx *gorm.DB) error {

			fmt.Println("Test after fetching order: ", NewBook)
			if err := tx.Create(&NewBook).Error; err != nil {
				fmt.Println(err)
				return err
			}
			return nil
		})
	} else {
		w.WriteHeader(301)
	}

}

func GetAll(w http.ResponseWriter, r *http.Request) {

	var allbook []structures.UserBooks
	var params = mux.Vars(r)
	var userid = params["userbookid"]

	fmt.Println(userid, " in get fuction for userbook")

	globaldb.Preload("Book").Where("uid= ?", userid).Find(&allbook)

	fmt.Println(len(allbook))
	for i := 0; i < len(allbook); i++ {
		if allbook[i].DeletedAt == nil {
			fmt.Println(allbook[i], allbook[i].CreatedAt)
		}
	}
	json.NewEncoder(w).Encode(allbook)
	GetDues()
	w.WriteHeader(200)
}

func Delete(w http.ResponseWriter, r *http.Request) {
	var book structures.UserBooks

	var params = mux.Vars(r)
	var userid = params["id"]
	fmt.Println(userid)

	globaldb.Debug().Where("id >= ?", userid).First(&book)
	globaldb.Delete(&book)
	GetDues()
	w.WriteHeader(200)
}

func GetDues() {
	timeFormat := "2006-01-02"
	var allbook []structures.UserBooks
	globaldb.Preload("Book").Find(&allbook)
	var overdue int
	for i := 0; i < len(allbook); i++ {

		t, _ := time.Parse(timeFormat, allbook[i].CreatedAt.Format("2006-01-02"))
		fmt.Println(t)
		//  duration := time.Since(t)
		duration := time.Now().Sub(t)

		fmt.Printf("%f", duration.Hours())
		day := duration.Hours() / 24
		var days int = int(day)
		fmt.Println("days print:", days)
		if days > 7 {

			overdue = (days - 7) * 5
		} else {
			overdue = 0
		}
		globaldb.Debug().Model(allbook).Where("id = ?", allbook[i].ID).Update("dues", overdue)
	}
	Userdues()
}

func Userdues() {
	var allusers []structures.User
	var allbook []structures.UserBooks
	globaldb.Preload("Book").Find(&allbook)
	globaldb.Preload("Books").Find(&allusers)

	users := len(allusers)
	books := len(allbook)
	fmt.Println(users, "users ", books, "books")

	for i := 0; i < len(allusers); i++ {
		duecount := 0

		for j := 0; j < len(allbook); j++ {
			if allusers[i].Uid == allbook[j].Uid {
				fmt.Println(" dueof jin loop:", allbook[j].Dues)
				duecount = duecount + allbook[j].Dues
			}

		}
		fmt.Println(" due:", duecount)
		globaldb.Debug().Model(allusers).Where("id = ?", allusers[i].ID).Update("dues", duecount)
	}

}
