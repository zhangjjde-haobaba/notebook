<template>
<nav>

    <v-app-bar flat app>
        <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-app-bar-title class="text-uppercase grey--text">
            <span class="font-weight-bold">Notebook</span>
        </v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app  color="#F4F5F9">
        <v-card height="200px" align="center" class="pa-8" color="#ECEFF1">
            <v-badge bordered bottom color="green" dot offset-x="10" offset-y="10" class="mb-8" elevation="18">
                <v-avatar size="100">
                    <v-img src="https://cdn.jsdelivr.net/gh/zhangjjde-haobaba/imageBed@main//avatar-1.png"></v-img>
                </v-avatar>
            </v-badge>
        </v-card>
        <v-list>
            <v-list-item v-for="link in links" :key="link.text" router :to="link.route" color="#90A4AE">
                <v-list-item-action>
                    <v-icon class="black--text font-weight-medium">{{link.icon}}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title class="black--text font-weight-medium">
                        {{link.text}}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</nav>
</template>

<script>
    export default {
        name: "NavBar",
        data(){
            return{
                drawer:false,
                links:[
                    {icon:'mdi-view-dashboard',text:'To-do List',route:'/'},
                    {icon:'mdi-text-box',text:'Detailed List',route:'/about'},
                    // {icon:'mdi-file-chart-check-outline',text:'Update page',route:'/update'},
                    {icon:'mdi-briefcase-upload',text:'Upload Page',route:'/upload'},
                    {icon:'mdi-briefcase-download-outline',text:'Download Page',route:'/download'}
                ],

            }
        }
    }
</script>

<style scoped>

</style>