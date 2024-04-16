<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex">
        <div class="navbar-brand-box d-flex flex-column justify-content-center">
          <a href="{{ url('dashboard') }}" class="logo">
            <span class="logo-sm">
              <h4 class="text-white">{{ $t("AP") }}</h4>
            </span>
            <span class="logo-lg text-white">
              {{ $t("Admin Panel") }}
            </span>
          </a>
        </div>

        <button
          type="button"
          class="btn btn-sm px-3 font-size-24 header-item waves-effect"
          id="vertical-menu-btn"
        >
          <i class="ri-menu-2-line align-middle"></i>
        </button>
      </div>

      <div class="d-flex">
        <!-- <div class="dropdown d-none d-sm-inline-block">
                <button type="button" class="btn header-item waves-effect" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src="{{ asset('/images/flags/' . App::getLocale() . '.jpg')}}" alt="Header Language" height="16">
                </button>

                <ul class="dropdown-menu dropdown-menu-right">
                    @foreach ( collect(config('app.locales_app')) as $item )
                    <li class="text-center">
                        <a href="{{ Helper::change_locale($item) }}" class="dropdown-item notify-item">
                            <img src="{{ asset('/images/flags/' . $item . '.jpg')}}" alt="{{ $item }}" class="mr-1" height="12"> <span class="align-middle">{{ strtoupper($item) }}</span>
                        </a>
                    </li>
                    @endforeach
                </ul>
            </div> -->

        <!--
            <div class="dropdown d-inline-block">
                <button type="button" class="btn header-item noti-icon waves-effect" id="page-header-notifications-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="ri-notification-3-line"></i>
                    <span class="noti-dot"></span>
                </button>

                <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right p-0" id="dropd-noti" aria-labelledby="page-header-notifications-dropdown">
                    <div class="p-3">
                        <div class="row align-items-center">
                            <div class="col">
                                <h6 class="m-0">{{ $t('Notifications') }}</h6>
                            </div>
                            <div class="col-auto">
                                <a href="#!" class="small"> @lang('translation.View_All')</a>
                            </div>
                        </div>
                    </div>
                    <div data-simplebar style="max-height: 230px;">
                        <a href="" class="text-reset notification-item">
                            <div class="media">
                                <div class="avatar-xs mr-3">
                                    <span class="avatar-title bg-primary rounded-circle font-size-16">
                                        <i class="ri-shopping-cart-line"></i>
                                    </span>
                                </div>
                                <div class="media-body">
                                    <h6 class="mt-0 mb-1">@lang('translation.Your_order_is_placed')</h6>
                                    <div class="font-size-12 text-muted">
                                        <p class="mb-1">@lang('translation.If_several_languages_coalesce _the_grammar')</p>
                                        <p class="mb-0"><i class="mdi mdi-clock-outline"></i> @lang('translation.min_ago')</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="p-2 border-top">
                        <a class="btn btn-sm btn-link font-size-14 btn-block text-center" href="javascript:void(0)">
                            <i class="mdi mdi-arrow-right-circle mr-1"></i> @lang('translation.View_More')..
                        </a>
                    </div>
                </div>
            </div>
            -->

        <div class="dropdown d-inline-block user-dropdown">
          <button
            class="btn header-item waves-effect"
            type="button"
            id="page-header-user-dropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              class="rounded-circle header-profile-user"
              src=""
              alt="Header Avatar"
            />
            <span class="d-none d-xl-inline-block ml-1">Ecommerce</span>
            <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
          </button>
          <ul class="dropdown-menu" aria-labelledby="page-header-user-dropdown">
            <li>
              <a class="dropdown-item text-danger" href="#">
                <i class="ri-shut-down-line align-middle me-1 text-danger"></i>
                {{ $t("Logout") }}
              </a>
              <form
                id="logout-form"
                action="#"
                method="POST"
                style="display: none"
              >
                @csrf
              </form>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts"></script>
