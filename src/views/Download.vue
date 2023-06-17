<template>
    <div class="download">
        <h1 class="subtitle-1 grey--text pa-8">Download page</h1>
        <v-divider></v-divider>

        <v-container>
            <v-row>
                <v-row>
                    <v-col col="12" sm="4">
                        <div class="grey--text headline-4 font-weight-bold">File Name</div>
                    </v-col>
                    <v-col col="12" sm="4">
                        <div class="grey--text headline-4 font-weight-bold">File Type</div>
                    </v-col>
                    <v-col col="12" sm="4">
                        <div class="grey--text headline-4 font-weight-bold">Download Link</div>
                    </v-col>
                </v-row>
            </v-row>
            <v-row v-for="(file, index) in files" :key="index">
                <v-col col="12" sm="4">
                    <div class="headline-3">{{file.name}}</div>
                </v-col>
                <v-col col="12" sm="4">
                    <div class="headline-3">{{file.type}}</div>
                </v-col>
                <v-col col="12" sm="4">
                    <div class="headline-3"><a :href="file.url" download>{{ file.name }}</a></div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import { getStorage, ref, listAll, getMetadata, getDownloadURL  } from "@firebase/storage";

    export default {
        name: "Download",
        data(){
            return{
                files: []
            }
        },
        async mounted() {
            const storage = getStorage();
            const storageRef = ref(storage, 'image/');

            const { items } = await listAll(storageRef);
            const files = await Promise.all(
                items.map(async (itemRef) => {
                    const metadata = await getMetadata(itemRef);

                    const url = await getDownloadURL(itemRef);
                    console.log(url);
                    return {
                        name: metadata.name,
                        type: metadata.contentType,
                        url:url
                    };
                })
            );
            this.files = files;
        }
    }
</script>

<style scoped>

</style>