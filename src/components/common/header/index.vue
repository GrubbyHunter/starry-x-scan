<template>
  <div class="page-header">
    <div class="header-section">
      <div class="header-container">
        <nav class="header-menu">

          <div class="w-lg-auto">
            <a class="navbar-brand">
              <img :src="LogoSvg" />
            </a>
          </div>

          <div>
            <el-button class="mobile-button"
              @click="changeExpand"
              :icon="isExpand ? CloseBold : Fold"
            ></el-button>
          </div>

          <div class="menu-container">
            <div class="menu-component">
              <menu-component></menu-component>
            </div>
            <div class="search-component">
              <search></search>
            </div>
          </div>

        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * @file header.vue
 */
import Search from "./search.vue"
import { useMenuState } from "./state/menu"
import { CloseBold, Fold } from "@element-plus/icons-vue"
import MenuComponent from "./menu.vue"
import LogoSvg from "@/assets/svg/logo-scan.svg"

const { isExpand, changeExpand } = useMenuState()
</script>

<style lang="less" scoped>
.page-header {
  position: relative;
  right: 0;
  left: 0;
  width: 100%;
  z-index: 1001;

  .header-section {
    border-bottom: 1px solid @border-color;
    position: relative;
    z-index: 1;
    background-color: #fff;
    box-shadow: 0 1px 1rem rgb(151 164 175 / 10%);

    .header-container {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      margin: 0 auto;
      width: 100%;
      height: 100%;

      .header-menu {
        padding: 0.25rem;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;

        .w-lg-auto {
          width: auto;
          display: flex;
          align-items: center;
        }

        .navbar-brand {
          display: inline-block;
          padding-top: 0.33594rem;
          padding-bottom: 0.33594rem;
          margin-right: 1rem;
          font-size: 1.09375rem;
          line-height: inherit;
          white-space: nowrap;

          img {
            width: 16rem;
          }
        }

        .mobile-button {
          display: flex;
        }

        .menu-container {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;

          .menu-component {
            flex: 1;
          }

          .search-component {
            flex: 1;
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }

  .w-60 {
    width: 100%;
  }
}

@media (min-width: 576px) {
  .header-container {
    max-width: 100% !important;

    .header-menu {
      flex-wrap: nowrap !important;
    }

    .mobile-button {
      display: none !important;
    }
  }

  .menu-container {
    .menu-component {
      display: block !important;
      flex-basis: auto !important;
      order: 2;
    }

    .search-component {
      order: 1;
    }
  }

  .w-60 {
    width: 60% !important;
  }
}

@media (min-width: 576px) and (max-width: 1200px) {

}

@media (min-width: 1400px) {
  .header-container {
    max-width: 1400px !important;
  }

  .w-60 {
    width: 60% !important;
  }
}
</style>
