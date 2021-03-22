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
      recommendedtitle: 'Our recommendations',
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
    ...mapGetters('catalog', { catalog: 'catalog', recommendation: 'recommendation' }),
    recommendations() {
      return this.catalog.filter(
        (item) => (
          this.recommendations.some((r) => r.Id === item.Id)
        ),
      );
    },
  },
  methods: {
    ...mapActions('catalog', ['getCatalogAction', 'getRecommendationAction']),
    async getCatalog() {
      this.errorMessage = undefined;
      try {
        await this.getCatalogAction();
      } catch (error) {
        this.errorMessage = 'Unauthorized';
      }
    },
    async getRecommendations() {
      this.errorMessage = undefined;
      try {
        await this.getRecommendationAction();
      } catch (error) {
        this.errorMessage = 'Unauthorized';
      }
    },
  },
};
</script>

<template>
  <div class="content-container">
    <ListHeader :title="recommendedtitle" @refresh="getRecommendations" :routePath="routePath">
    </ListHeader>
      <CatalogList
          :icecreams="recommendations"
          :errorMessage="errorMessage"
       ></CatalogList>
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
