<script>
import { mapActions, mapGetters } from 'vuex';
import ListHeader from '@/components/list-header.vue';
import CatalogList from './catalog-list.vue';

export default {
  name: 'Catalog',
  data() {
    return {
      errorMessage: '',
      message: '',
      routePath: '/catalog',
      title: 'Our Ice Creams',
    };
  },
  components: {
    ListHeader,
    CatalogList,
  },
  async created() {
    await this.getCatalog();
    await this.getRecommendations();
  },
  computed: {
    ...mapGetters('catalog', { catalog: 'catalog' }),
    ...mapGetters('recommendations', { recommendations: 'recommendations' }),
    recommendationresult() {
      return this.catalog.filter(
        (item) => (
          this.recommendations.some((r) => r.Id === item.Id)
        ),
      );
    },
  },
  methods: {
    ...mapActions('catalog', ['getCatalogAction']),
    ...mapActions('recommendations', ['getRecommendationsAction']),
    async getCatalog() {
      this.errorMessage = undefined;
      try {
        await this.getCatalogAction();
      } catch (error) {
        debugger;
        this.errorMessage = 'Unauthorized';
      }
    },
    async getRecommendations() {
      this.errorMessage = undefined;
      try {
        await this.getRecommendationsAction();
      } catch (error) {
        debugger;
        this.errorMessage = 'Unauthorized';
      }
    },
  },
};
</script>

<template>
  <div class="content-container">
    <ListHeader :title="title" @refresh="getCatalog" :routePath="routePath">
    </ListHeader>
    <div class="columns is-multiline is-variable">
      <div class="column" v-if="catalog">
        <CatalogList
          :icecreams="catalog"
          :errorMessage="errorMessage"
        ></CatalogList>
      </div>
    </div>
  </div>
</template>
