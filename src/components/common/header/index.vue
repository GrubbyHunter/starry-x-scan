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
            <el-button class="mobile-button"></el-button>
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
import MenuComponent from "./menu.vue"
import LogoSvg from "@/assets/svg/logo-scan.svg"

</script>

<style lang="less" scoped>
.page-header {
  position: relative;
  right: 0;
  left: 0;
  width: 100%;
  z-index: 1001;

  .header-section {
    height: 9.6rem;
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
          display: none;
        }

        .menu-container {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;

          .menu-component {
            flex: 1;
            height: 50%;
            order: 2;

            > ul {
              height: 100%;
            }
          }

          .search-component {
            flex: 1;
            height: 50%;
            order: 1;
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
    max-width: 100%;

    .header-menu {
      display: flex;
    }
  }

  .menu-container {
    .menu-component {
      display: flex !important;
      flex-basis: auto;
    }
  }

  .w-60 {
    width: 60% !important;
  }
}

@media (min-width: 576px) and (max-width: 1200px) {
  .header-container {
    padding-left: 4.5rem;
    padding-right: 4.5rem;
  }

  .w-60 {
    width: 60% !important;
  }
}

@media (min-width: 1400px) {
  .header-container {
    max-width: 1400px;
  }

  .w-60 {
    width: 60% !important;
  }
}
</style>
