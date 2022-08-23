package control

import (
	"api/structures"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	userbook "api/userbook/control"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
)

var globaldb *gorm.DB

func PassDB(db *gorm.DB) {
	globaldb = db

}

func New(w http.ResponseWriter, r *http.Request) {
	var user structures.User
	err := json.NewDecoder(r.Body).Decode(&user)

	fmt.Println("ultitest new user value:", user)
	fmt.Println("errorr is:", err)
	uid := uuid.New()
	user.Uid = uid.String()
	fmt.Println(user)

	globaldb.Debug().Transaction(func(tx *gorm.DB) error {
		fmt.Println("Test after fetching order: ", user)
		if err := tx.Create(&user).Error; err != nil {
			fmt.Println(err)
			return err
		}
		return nil
	})
}

func GetAll(w http.ResponseWriter, r *http.Request) {
	var Alluser []structures.User
	globaldb.Debug().Find(&Alluser)
	fmt.Println(len(Alluser))
	for i := 0; i < len(Alluser); i++ {
		if Alluser[i].DeletedAt == nil {
			fmt.Println(Alluser[i], Alluser[i].CreatedAt)
		}
	}
	json.NewEncoder(w).Encode(Alluser)
	w.WriteHeader(200)
}
func Update(w http.ResponseWriter, r *http.Request) {
	var params = mux.Vars(r)
	var user, update structures.User

	var userid = params["userid"]
	fmt.Println(userid)
	err := json.NewDecoder(r.Body).Decode(&update)
	fmt.Println("update user recieved struct:", update)
	if err != nil {
		fmt.Println("error occured", err)
	}
	globaldb.Debug().Where("id = ?", userid).First(&user)
	u64, _ := strconv.ParseUint(userid, 10, 32)
	if user.ID != uint(u64) {
		fmt.Println("Product Not found")
		w.WriteHeader(404)
		fmt.Fprintf(w, "%s Not Found", userid)
		return
	} else {

		if update.UserName != "" {
			globaldb.Debug().Model(user).Where("id = ?", userid).Update("user_name", update.UserName)
		}
		if update.FName != "" {
			globaldb.Debug().Model(user).Where("id = ?", userid).Update("f_name", update.FName)
		}
		if update.LName != "" {
			globaldb.Debug().Model(user).Where("id = ?", userid).Update("l_name", update.LName)
		}
		if update.PassWord != "" {
			globaldb.Debug().Model(user).Where("id = ?", userid).Update("Pass_Word", update.PassWord)
		}
		if update.Address != "" {
			globaldb.Debug().Model(user).Where("id = ?", userid).Update("Address", update.Address)
		}

		if update.Number != 0 {
			numberbool := update.Number
			globaldb.Debug().Model(user).Where("id = ?", userid).Update("number", &numberbool)
		}
		fmt.Println(update.Dues)
		Duesbool := update.Dues
		globaldb.Debug().Model(user).Where("id = ?", userid).Update("dues", &Duesbool)
		userbook.GetDues()
		w.WriteHeader(201)
	}
}
func Delete(w http.ResponseWriter, r *http.Request) {

	var params = mux.Vars(r)
	var user structures.User
	var userid string = params["userid"]
	fmt.Println(userid, "in delete")

	globaldb.Debug().Where("id = ?", userid).First(&user)

	globaldb.Delete(&user)

	w.WriteHeader(200)
}
func Soleuser(w http.ResponseWriter, r *http.Request) {
	var params = mux.Vars(r)
	var user structures.User
	var userid string = params["userid"]
	fmt.Println(userid, "in user")
	globaldb.Debug().Where("uid = ?", userid).First(&user)
	json.NewEncoder(w).Encode(&user)
	userbook.GetDues()
	w.WriteHeader(200)
}
