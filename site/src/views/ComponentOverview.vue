<template>
  <section class="markdown">
    <h1>组件总览</h1>
    <section class="markdown">
      <p>
        <code>vc</code>
        平台提供丰富的可视化组件模板，通过各种参数的配置以及自定义事件，可以解决各种自定义化的需求
      </p>
    </section>
    <a-divider></a-divider>
    <template v-for="group in menuItems" :key="group.title">
      <div class="components-overview">
        <h2 class="ant-typography components-overview-group-title">
          <a-space align="center">
            {{ group.title }}
            <a-tag style="display: block">{{ group.children.length }}</a-tag>
          </a-space>
        </h2>
        <a-row :gutter="[24, 24]">
          <template v-for="component in group.children" :key="component.title">
            <a-col :xs="24" :sm="12" :lg="8" :xl="6">
              <router-link :to="component.path">
                <a-card size="small" class="components-overview-card">
                  <template #title>
                    <div class="components-overview-title">
                      {{ component.title }}
                      {{ component.subtitle }}
                    </div>
                  </template>
                  <div class="components-overview-img">
                    <img :src="component.cover" :alt="component.title" />
                  </div>
                </a-card>
              </router-link>
            </a-col>
          </template>
        </a-row>
      </div>
    </template>
  </section>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
// import { SearchOutlined } from '@ant-design/icons-vue';
import useMenus from '../hooks/useMenus';
import { getLocalizedPathname } from '../utils/util';

export default defineComponent({
  name: 'ComponentOverview',
  components: {
    // SearchOutlined,
  },
  setup() {
    const search = ref('');
    const { dataSource } = useMenus();
    const menuItems = computed(() => {
      return dataSource.value
        .filter((i) => i.order > -1)
        .map((group) => {
          const components = group.children.filter(
            (component: any) =>
              !search.value.trim() ||
              component.title
                .toLowerCase()
                .includes(search.value.trim().toLowerCase()) ||
              (component.subtitle || '')
                .toLowerCase()
                .includes(search.value.trim().toLowerCase())
          );
          return { ...group, children: components };
        })
        .filter((i) => i.children.length);
    });
    return {
      menuItems,
      getLocalizedPathname
    };
  }
});
</script>
<style lang="less" src="./ComponentOverview.less"></style>
