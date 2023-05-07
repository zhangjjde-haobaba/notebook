<template>
    <div class="update">
        <h1 class="subtitle-1 grey--text pa-8">update page</h1>
        <v-form class="px-3" ref="form">
            <v-text-field label="Title" v-model="title" prepend-inner-icon="mdi-folder" :rules="inputRules"></v-text-field>
            <v-textarea label="Information" v-model="content" prepend-inner-icon="mdi-account-edit-outline" :rules="inputRules"></v-textarea>
            <v-text-field label="Name" v-model="name" prepend-inner-icon="mdi-account-badge" :rules="NameRules"></v-text-field>
            <v-select
                    v-model="select"
                    :items="items"
                    :rules="[v => !!v || 'Item is required']"
                    label="Status"
                    required
            ></v-select>
            <v-menu>
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                            v-model="date"
                            label="Due date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            :rules="inputRules"
                    ></v-text-field>
                </template>
                <v-date-picker
                        v-model="date"
                        no-title
                        scrollable
                >
                    <v-spacer></v-spacer>
                    <v-btn
                            text
                            color="primary"
                            @click="menu = false"
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(date)"
                    >
                        OK
                    </v-btn>
                </v-date-picker>
            </v-menu>

            <v-btn text class="success mx-0 mt-3" @click="submit" :loading="loading">Update project</v-btn>
        </v-form>
    </div>
</template>

<script>
    import db from '@/fb.js'
    import { doc, setDoc } from "firebase/firestore";
    export default {
        name: "Update",
        data(){
            return{
                id:'',
                title:'',
                name:'',
                NameRules: [
                    value => {
                        if (value?.length > 3) return true

                        return 'First name must be at least 3 characters.'
                    },
                ],
                content:'',
                date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                menu: false,
                inputRules:[
                    v => v.length >= 3 || 'Minimum length is 3 characters'
                ],
                select:null,
                items: [
                    'ongoing',
                    'complete',
                    'overdue',
                ],
                loading:false,

            }
        },
        methods:{
            async submit(){
                if(this.$refs.form.validate()){
                    this.loading = true
                    console.log(this.title, this.content, this.date, this.name, this.select)
                    const project = {
                        title : this.title,
                        content : this.content,
                        due: this.date,
                        person: this.name,
                        status: this.select

                    }
                    try {
                        const docRef =  await setDoc(doc(db.db, "projects",this.id),

                            project
                        );

                        this.loading = false
                        this.$router.push('/')
                    } catch (e) {
                        console.error("Error adding document: ",e);
                    }
                }
            }
        },
        mounted() {
            this.data = JSON.parse(this.$route.query.data)
            console.log(this.data)
            this.title = this.data.title
            this.content = this.data.content
            this.name = this.data.person
            this.select = this.data.status
            this.due = this.data.due
            this.id = this.data.id
        }
    }
</script>

<style scoped>

</style>