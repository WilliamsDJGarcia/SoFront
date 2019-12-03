<template>
  <v-app>
  <v-content>
      <myC></myC>
      <v-container>
        <v-layout
          text-xs-center
          wrap
        >
        </v-layout>
        <!-- <us></us> -->
      </v-container>
  </v-content>
</v-app>
</template>

<script>
  import Bar from '@/components/bar'
  import Us from '@/components/Main'

  export default {
    data: () => ({
      
      

    }),
    components:{
      'myC': Bar,
    }
  }
</script>

<style>

</style>
