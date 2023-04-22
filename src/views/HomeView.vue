<template>
  <div class="home">

    <v-snackbar v-model="snackbar" :timeout="4000" top>
      <span>Awesome! you add a to do thing</span>
      <template v-slot:action="{ attrs }">
        <v-btn
                color="red"
                text
                v-bind="attrs"
                @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <h1 class="subtitle-1 grey--text pa-8">Dashboard homepage</h1>
    <v-container>
      <v-row justify-space-between>
        <v-col md3>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn large text color="grey" @click="sortBy('due')" v-bind="attrs" v-on="on">
                <v-icon large left>mdi-folder</v-icon>
                <span class="caption text-lowercase">By due time</span>
              </v-btn>
            </template>
            <span>Sort To Do Things By Title Name</span>
          </v-tooltip>
        </v-col>

        <v-col md3>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <Popup @projectAdded = "snackbar = true"/>
            </template>
            <span>Add New Project</span>
          </v-tooltip>
        </v-col>

      </v-row>

      <v-card flat height="5rem"  v-for="project in projects" :key="project.title">
        <v-row wrap :class="`pa-3 project ${project.status} `">
          <v-col xs12 md6>
            <div class="caption grey--text">Project Title</div>
            <div>{{project.title}}</div>
          </v-col>
          <v-col xs6 sm4 md2>
            <div class="caption grey--text">Person</div>
            <div>{{project.person}}</div>
          </v-col>
          <v-col xs6 sm4 md2>
            <div class="caption grey--text">Due by</div>
            <div>{{project.due}}</div>
          </v-col>
          <v-col xs2 sm4 md2>
            <div class="float-right">
              <v-chip id="chip-container" small :class="`${project.status} white--text my-2 caption` " >{{project.status}}</v-chip>
            </div>
          </v-col>
          <v-col xs2 sm4 md2>
            <v-btn depressed prepend-icon="mdi-delete-circle" rounded="lg" class="#424242 red--text" @click="deleteProject(project)">
              Delete
            </v-btn>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>

<script>
  import HelloWorld from '../components/HelloWorld'
  import Popup from '../components/Popup'
  import db from '@/fb.js'
  import { collection, getDocs } from "firebase/firestore";
  import { doc, deleteDoc } from "firebase/firestore";

  export default {
    name: 'Home',
    data(){
      return{
        projects:[
          // {title:'Design a new website', person:'the net ninjia', due:'1st jan 2022', status:'ongoing'},
          // {title:'Code on the homepage', person:'chun li', due:'1st jan 2022', status:'complete'},
          // {title:'Design video thumbnails', person:'Ryu', due:'1st jan 2022', status:'complete'},
          // {title:'Create a community forum', person:'Gouken', due:'1st jan 2022', status:'overdue'}
        ],
        snackbar:false
      }
    },
    methods:{
      sortBy(prop){
        this.projects.sort((a,b)=> a[prop]<b[prop] ? -1 : 1)
      },
        async deleteProject(project){
            // console.log(project.id);
            await deleteDoc(doc(db.db, "projects", project.id));
            location.reload();
        }
    },

    components: {
      HelloWorld,
      Popup
    },
      async created() {
          console.log(db)
          const querySnapshot = await getDocs(collection(db.db, "projects"));
          console.log(querySnapshot)
          querySnapshot.forEach((doc) => {
              console.log(`${doc.id} => ${doc.data()}`);
              this.projects.push({
                  ...doc.data(),
                  id: doc.id
              })
          });


      },


  }
</script>
<style>
  .project.complete{
    border-left: 4px solid #3cd1c2;
  }
  .project.ongoing{
    border-left: 4px solid orange;
  }
  .project.overdue{
    border-left: 4px solid tomato;
  }
  #chip-container.v-chip.complete{
    background: #3cd1c2;
  }
  #chip-container.v-chip.ongoing{
    background: #ffaa2c;
  }
  #chip-container.v-chip.overdue{
    background: #f83e70;
  }
</style>
