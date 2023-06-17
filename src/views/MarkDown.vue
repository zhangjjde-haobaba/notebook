<template>
    <div class="markdown">
        <h1 class="subtitle-1 grey--text pa-8">Markdown</h1>
        <!--        npm install markdown-it html2pdf.js --save-->
        <!--        npm install vue-markdown-editor --save-->
        <!--         npm install marked --save-->
        <!--        npm install markdown-it vue-markdown-->
        <!--        npm install babel-runtime --save-->
        <!--        npm install @babel/runtime --save-->

        <v-container>
            <v-row>
                <v-col cols="6">
                    <v-text-field label="File title" v-model="titleInput"></v-text-field>
                </v-col>
            </v-row>
            <v-row class="input_content">
                <v-col cols="6">
                    <textarea v-model="markdownContent" placeholder="Enter here" style="height: 400px;" @input="renderMarkdown"></textarea>
                </v-col>
                <v-col cols="6">
                    <div class="new_content" v-html="renderedHTML" style="height: 400px;"></div>
                </v-col>
            </v-row>


            <v-row>
                <v-col cols="12" class="center-align">
                    <v-btn class="button" @click="exportToPDF">Export to PDF</v-btn>
                </v-col>
            </v-row>

        </v-container>
    </div>
</template>

<script>
    import markdownIt from 'markdown-it';
    import html2pdf from 'html2pdf.js';
    import VueMarkdown from 'vue-markdown';

    export default {
        name: "MarkDown",
        components: {
            VueMarkdown,
        },
        data(){
            return{
                markdownContent:'',
                renderedHTML: '',
                titleInput:''
            }
        },
        methods:{

            // exportToPDF() {
            //     const md = markdownIt();
            //     const html = md.render(this.markdownContent);
            //     this.convertToPDF(html);
            // },
            //
            // convertToPDF(html) {
            //     const element = document.createElement('div');
            //     element.innerHTML = html;
            //
            //     html2pdf().from(element).save('output.pdf');
            // },
            renderMarkdown() {
                const md = markdownIt();
                this.renderedHTML = md.render(this.markdownContent);
            },
            exportToPDF() {
                const element = document.createElement('div');
                element.innerHTML = this.renderedHTML;
                if(this.titleInput){
                    html2pdf().from(element).save(this.titleInput+'.pdf');
                }else{
                    html2pdf().from(element).save();
                }

            },

        },

    }
</script>

<style scoped>
.button{
    margin: 20px;
}
.input_content{
    height: 400px;
}

textarea {
    width: 100%;
    overflow-y: auto;
    word-wrap: break-word;
    border: 1px solid black;
    border-radius: 4px;
    padding: 5px;
}
.new_content{
    border: 1px solid black;
    border-radius: 4px;
    padding: 5px;
}

.center-align {
    display: flex;
    justify-content: center;
}
</style>