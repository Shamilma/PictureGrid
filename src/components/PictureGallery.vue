<template>
    <div id="picturegallary">

         <template v-if="loading">
             <Loader></Loader>;
        </template>

        <template v-else>

            <button class="addButton" @click="addPictures(25)">Add Pictures</button>

            <div class="grid-container">
                <div v-for="index in numOfPictures" :key="index">

                    <img
                    v-lazy="pictures[index].thumbnailUrl"
                    @click="showModal(index)">

                </div>
            </div>

            <div v-if="displayModal" class="modal" 
            @click.self="hideModal">
                <div class="modal-content">

                    <span class="close" @click="hideModal">&times;</span>

                    <img :src="modalPicture"/>

                    <a class="prev" @click="showSlide(--indexToSelectedPicture)">&#10094;</a>
                    <a class="next" @click="showSlide(++indexToSelectedPicture)">&#10095;</a>

                    <div class="caption">{{modalTitle}}</div>

                </div>
            </div>

        </template>

    </div>
</template>

<script>
import Pictures from "../services/api/Pictures.js"
import Loader from "./Loader"
export default {
name: "picturegallery",
data () {
    return {
        numOfPictures: 25,
        indexToSelectedPicture: 0,
        pictures: "",
        modalDisplay: "none",
        modalPicture: "",
        modalTitle: "",
        displayModal:false,
        loading: true
    }
},

components: {
    Loader
},

created () {
    /*
    * Gets pictures from a service api Pictures.js
    */
    Pictures.getPictures().then(pictures => {
      this.pictures = pictures
    })
    .catch(error => console.log(error))
    .finally(() => {
        // Error or not, remove loading
        this.loading = false 
    })
  },
methods: {
    /*
    * This function gets the selected index of thumbnailPicture and loads up a modal of this picture.
    * @param index - the index of the selected picture
    */
    showModal: function (index) {
        this.displayModal = true
        this.modalPicture = this.pictures[index].url
        this.modalTitle = this.pictures[index].title
        this.indexToSelectedPicture = index
        },
    /*
    * Hides the displayed model.
    */
    hideModal: function () {
        this.displayModal = false
        },
    /*
    * This function shows the next or previous picture in depending on user input.
    * @param newIndex - the index of the next or previous picture
    */
    showSlide: function (newIndex) {
        if(newIndex == 0) {
            newIndex = this.numOfPictures
        }
        else if(newIndex >= this.numOfPictures) {
            newIndex = 1;
        }
        this.showModal(newIndex)      
    },
    /*
    * This inserts a specified amount of pictures into the grid.
    * @param amount - number of pictures
    */
    addPictures(amount) {
        this.numOfPictures += amount;
    }
    },
}
</script>

<style>

/*
* GRID (DESIGN 1)
*/
.grid-container {
    display:grid;
    grid-template-columns: auto auto auto auto auto;
    grid-gap: 20px;
    height: 33em;
    width:100%;
    overflow:auto;
    
}
.grid-container > div {
    text-align:center;
}
.grid-container > div > img {
    width: 100%;
    transition: 0.3s;
    vertical-align: middle;
}
.grid-container > div > img:hover {
    transform: scale(1.09);
}
/*
* MODAL
*/
.modal {
    display:block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    padding-top:80px;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);
}
.modal-content {
    background-color:whitesmoke;
    margin: auto;
    position:relative;
    border: 1px solid #888;
    width: 45%;
}
.modal-content img {
    width:100%;
    vertical-align: middle;
}

/* next & previous buttons */
.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  padding: 10px 16px 10px 16px;
  color: #fff;
  font-weight: bold;
  font-size: 32px;
  border-radius: 0 3px 3px 0;
}

/* position the "next button" to the right */
.next {
    right: 0;
    border-radius: 3px 0 0 3px;
}
.prev {
    left: 0;
}

/* on hover, add a black background color with a little bit see-through */
.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.8);
}

.close {
    color: #aaa;
    position: absolute;
    top: 0;
    right:0;
    padding:16px;
    font-size: 30px;
    font-weight: bold;
}
.close:hover,
.close:focus {
    color:#fff;
    text-decoration:none;
    cursor:pointer;
}
.caption {
    color: #fff;
    position:absolute;
    width: auto;
    left: 50%;
    top:90%;
    transform: translate(-50%,-50%);
    
}

/*
* BUTTON
*/
.addButton {
    float:left;
    padding: 15px 25px;
    cursor: pointer;
    font-size: 1.5em;
    text-decoration: none;
    outline: none;
    color: #fff;
    background-color: #4CAF50;
    border:none;
    border-radius:15px;
    box-shadow: 0 9px #999;
    margin: 20px 0 20px 0;
}
.addButton:hover {background-color: #3e8341;}
.addButton:active {
    background-color: #3e8e41;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
}
/*
* RESPONSIVE
*/
/* Smaller screens, decrease text size on caption */
@media only screen and (max-width: 800px) {
    .caption {
        font-size:12px;
        top:85%;
    }
     .grid-container {
        grid-gap:13px;
        height: 15em;
    }
    .grid-container > div > img:hover {
    transform: scale(1.15);
    }
    .modal-content {
        width:60%;
    }
    .loader {
        width: 60px;
        height: 60px;
    }
    .addButton {
        padding: 8px 18px;
        font-size: 12px;
        border-radius:8px;
        box-shadow: 0 3px #999;
    }
    .addButton:active {
    background-color: #3e8e41;
    box-shadow: 0 2px #666;
    transform: translateY(2px);
    }
}
/* Smaller screens, decrease text size on buttons */
@media only screen and (max-width: 500px) {
     .grid-container {
        grid-gap:5px;
        height: 10em;
    }
    .close {
        font-size:20px;
    }
    .caption {
        font-size:12px;
        top:85%;
    }
    .prev, .next {
        font-size: 20px;
    }
    .loader {
        width: 60px;
        height: 60px;
    }
    .modal-content {
        width:90%;
    }
}


</style>
