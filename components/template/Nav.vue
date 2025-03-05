<template>
  <div
    id="sidebar"
    class="fixed top-0 left-0 z-40 max-md:top-auto max-md:bottom-0"
  >
    <div
      id="sidebar__inner"
      class="flex sside md:flex-col justify-between md:h-screen md:p-2 p-1 transition-all duration-500 bg-white shadow dark:bg-zinc-900 2xl:w-72 xl:w-60 max-xl:w-[73px] max-md:w-screen max-md:border-t max-md:dark:border-zinc-700"
    >
      <!-- logo -->
      <div
        class="flex h-20 px-2 max-md:fixed max-md:top-0 max-md:w-full max-md:bg-white/80 max-md:left-0 max-md:px-4 max-md:h-14 max-md:shadow-sm max-md:dark:bg-zinc-900/80 backdrop-blur-xl"
      >
        <a href="/dashboard" id="logo" class="flex items-center gap-3">
          <!-- logo icon -->
          <img
            id="logo__icon"
            src="https://res.cloudinary.com/nsight/image/upload/v1721087388/logo_neutral_6e6fab0ffd.png"
            alt=""
            class="md:w-8 hidden text-2xl max-xl:!block max-md:!hidden shrink-0 uk-animation-scale-up"
          />

          <!-- text logo -->
          <img
            id="logo__text"
            src="https://res.cloudinary.com/nsight/image/upload/v1721087388/logo_neutral_6e6fab0ffd.png"
            alt=""
            class="w-full h-6 ml-1 max-xl:hidden max-md:block dark:!hidden"
          />
          <img
            id="logo__text"
            src="https://res.cloudinary.com/nsight/image/upload/v1721087388/logo_neutral_6e6fab0ffd.png"
            alt=""
            class="w-full h-6 ml-1 !hidden max-xl:!hidden max-md:block dark:max-md:!block dark:!block"
          />
        </a>
      </div>

      <!-- nav -->
      <nav class="flex-1 max-md:flex max-md:justify-around md:space-y-2">
        <!-- Home -->
        <a href="/dashboard">
          <svg
            id="icon__outline"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          <svg
            id="icon__solid"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="hidden"
          >
            <path
              fill-rule="evenodd"
              d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="max-xl:hidden"> Home </span>
        </a>

        <!-- Search -->
        <a href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <span class="max-xl:hidden"> Search </span>
        </a>
        <div
          class="ctr-search_body sm:w-[397px] w-full bg-white shadow-lg md:!left-[73px] hidden !left-0 dark:bg-zinc-900 dark:border1 max-md:bottom-[57px]"
          uk-drop="pos: left-center;animate-out: true; animation: uk-animation-slide-left-medium; mode:click; offset: 9"
          style="border: 1px solid #ffffff33 !important;"
        >
          <div class="md:h-screen overflow-y-auto h-[calc(100vh-120px)]">
            <!-- header -->
            <div
              class="px-5 py-4 space-y-5 border-b border-gray-100 dark:border-zinc-700"
            >
              <h3
                class="md:text-xl text-lg font-medium mt-3 text-black dark:text-white"
              >
                Search
              </h3>

              <div class="relative -mx-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-5 h-5 absolute left-3 bottom-1/2 translate-y-1/2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search"
                  class="bg-transparen w-full !pl-10 !py-2 !rounded-lg"
                />
              </div>
            </div>

            <!-- contents list -->
            <div class="p-2 space-y-2 dark:text-white">
              <div
                class="flex items-center justify-between py-2.5 px-3 font-semibold"
              >
                <h4 class="dark:text-white">Recent</h4>
                <button type="button" class="text-blue-500 text-sm">
                  Clear all
                </button>
              </div>

              <!-- <a href="profile.html" class="relative flex items-center gap-3 p-2 duration-200 rounded-xl hover:bg-zinc-300/30">
                    <img src="https://res.cloudinary.com/nsight/image/upload/v1693447226/placeholder_pfp_sv2pgb.jpg" alt="" class="bg-gray-200 rounded-full w-10 h-10">
                    <div class="fldex-1 min-w-0">
                        <h4 class="font-medium text-sm text-black dark:text-white">  Johnson smith </h4>
                        <div class="text-xs text-gray-500 font-normal mt-0.5 dark:text-white-80"> Suggested For You </div>
                    </div>
                </a> -->
              <!-- <a href="profile.html" class="relative flex items-center gap-3 p-2 duration-200 rounded-xl hover:bg-zinc-300/30">
                    <img src="https://res.cloudinary.com/nsight/image/upload/v1693447226/placeholder_pfp_sv2pgb.jpg" alt="" class="bg-gray-200 rounded-full w-10 h-10">
                    <div class="flex-1 min-w-0">
                        <h4 class="font-medium text-sm text-black dark:text-white"> James Lewis </h4>
                        <div class="text-xs text-gray-500 font-normal mt-0.5 dark:text-white-80"> Followed By Johnson </div>
                    </div>
                    <button type="button" class="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"> Follow </button>
                </a> -->

              <!-- <a href="profile.html" class="relative flex items-center gap-3 p-2 duration-200 rounded-xl hover:bg-zinc-300/30">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="border border-gray-200 p-2.5 rounded-full w-9 h-9 fill-black">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
                    </svg>
                    <div class="fldex-1 min-w-0">
                        <h4 class="font-medium text-sm text-black dark:text-white">   artificial intelligence  </h4>
                        <div class="text-xs text-gray-500 font-normal mt-0.5 dark:text-white-80"> 13,352K post </div>
                    </div>
                </a> -->
              <!--
                <a href="profile.html" class="relative flex items-center gap-3 p-2 duration-200 rounded-xl hover:bg-zinc-300/30">
                    <img src="https://res.cloudinary.com/nsight/image/upload/v1693447226/placeholder_pfp_sv2pgb.jpg" alt="" class="bg-gray-200 rounded-full w-10 h-10">
                    <div class="fldex-1 min-w-0">
                        <h4 class="font-medium text-sm text-black dark:text-white">  {{ auth?.user.first_name }} {{ auth?.user.last_name }} </h4>
                        <div class="text-xs text-gray-500 font-normal mt-0.5 dark:text-white-80"> Parker . following </div>
                    </div>
                </a> -->

              <!-- <a href="profile.html" class="relative flex items-center gap-3 p-2 duration-200 rounded-xl hover:bg-zinc-300/30">
                    <img src="https://res.cloudinary.com/nsight/image/upload/v1693447226/placeholder_pfp_sv2pgb.jpg" alt="" class="bg-gray-200 rounded-full w-10 h-10">
                    <div class="fldex-1 min-w-0">
                        <h4 class="font-medium text-sm text-black dark:text-white">  Johnson smith </h4>
                        <div class="text-xs text-gray-500 font-normal mt-0.5 dark:text-white-80"> Suggested For You </div>
                    </div>
                </a> -->
              <!-- <a href="profile.html" class="relative flex items-center gap-3 p-2 duration-200 rounded-xl hover:bg-zinc-300/30">
                    <img src="https://res.cloudinary.com/nsight/image/upload/v1693447226/placeholder_pfp_sv2pgb.jpg" alt="" class="bg-gray-200 rounded-full w-10 h-10">
                    <div class="flex-1 min-w-0">
                        <h4 class="font-medium text-sm text-black dark:text-white"> James Lewis </h4>
                        <div class="text-xs text-gray-500 font-normal mt-0.5 dark:text-white-80"> Followed By Johnson </div>
                    </div>
                    <button type="button" class="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"> Follow </button>
                </a> -->

              <!-- <a href="profile.html" class="relative flex items-center gap-3 p-2 duration-200 rounded-xl hover:bg-zinc-300/30">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="border border-gray-200 p-2.5 rounded-full w-9 h-9 fill-black">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
                    </svg>
                    <div class="fldex-1 min-w-0">
                        <h4 class="font-medium text-sm text-black dark:text-white">  Ui Designers </h4>
                        <div class="text-xs text-gray-500 font-normal mt-0.5 dark:text-white-80"> 9,362K post </div>
                    </div>
                </a>

                <a href="profile.html" class="relative flex items-center gap-3 p-2 duration-200 rounded-xl hover:bg-zinc-300/30">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="border border-gray-200 p-2.5 rounded-full w-9 h-9 fill-black">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
                    </svg>
                    <div class="fldex-1 min-w-0">
                        <h4 class="font-medium text-sm text-black dark:text-white"> Affiliate marketing  </h4>
                        <div class="text-xs text-gray-500 font-normal mt-0.5 dark:text-white-80"> 4,248K post </div>
                    </div>
                </a>

                <a href="profile.html" class="relative flex items-center gap-3 p-2 duration-200 rounded-xl hover:bg-zinc-300/30">
                    <img src="https://res.cloudinary.com/nsight/image/upload/v1693447226/placeholder_pfp_sv2pgb.jpg" alt="" class="bg-gray-200 rounded-full w-10 h-10">
                    <div class="fldex-1 min-w-0">
                        <h4 class="font-medium text-sm text-black dark:text-white">  Johnson smith </h4>
                        <div class="text-xs text-gray-500 font-normal mt-0.5 dark:text-white-80"> Suggested For You </div>
                    </div>
                </a>
                <a href="profile.html" class="relative flex items-center gap-3 p-2 duration-200 rounded-xl hover:bg-zinc-300/30">
                    <img src="https://res.cloudinary.com/nsight/image/upload/v1693447226/placeholder_pfp_sv2pgb.jpg" alt="" class="bg-gray-200 rounded-full w-10 h-10">
                    <div class="flex-1 min-w-0">
                        <h4 class="font-medium text-sm text-black dark:text-white"> James Lewis </h4>
                        <div class="text-xs text-gray-500 font-normal mt-0.5 dark:text-white-80"> Followed By Johnson </div>
                    </div>
                    <button type="button" class="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"> Follow </button>
                </a> -->
            </div>
          </div>
        </div>

        <!-- shop -->
        <a href="/shop">
          <svg
            id="icon__outline"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <svg
            id="icon__solid"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="hidden"
          >
            <path
              fill-rule="evenodd"
              d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="max-xl:hidden"> Shop </span>
        </a>

        <!-- Notifications -->
         <a href="#!" class="max-md:!fixed max-md:top-2 max-md:right-14 relative"> 
            <svg id="icon__outline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            <svg id="icon__solid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="hidden">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            <span  class="max-xl:hidden"> Notifications </span>
            <div v-if="state.notifications.total" class="w-2 h-2 bg-red-600 rounded-full absolute left-7 top-2.5"></div>
        </a>

        

        <div 
          class="ctr-notif_body w-[397px] md:w-[400px] w-full bg-white shadow-lg md:!left-[73px] hidden !left-0 dark:bg-zinc-900 dark:border1 max-md:bottom-[57px]" 
          uk-drop="pos: left-center;animate-out: true; animation: uk-animation-slide-left-medium ; mode:click"
            style="border: 1px solid #ffffff33 !important;"
          > 
          <div class="md:h-screen overflow-y-auto h-[calc(100vh-120px)]">

              <!-- header -->
              <div class="flex items-center justify-between px-5 py-4 mt-3">
                <h3 class="md:text-xl text-lg font-medium mt-3 text-black dark:text-white">Notifications</h3>
              </div>

              <!-- contents list -->
              <div class="px-2 -mt-2 text-sm font-normal">

                  <div class="py-3">
                    <div class="px-2">
                      <h4 class="font-thin text-white mb-5">New</h4>
                      <h3 class="font-thin text-white text-sm">Friend Requests</h3>
                    </div>
                      <!-- All Friend Requests -->
                    <div v-if="state.notifications.friend_requests" class="w-full px-2 flex flex-col">
                      <FriendRequest v-for="user in state.notifications.friend_requests" :key="user.id" :user="user" @update="getNotifications" />
                    </div>
                  </div>



                  <!-- <a href="#" class="relative flex items-center gap-3 p-2 duration-200 rounded-xl hover:bg-secondery">
                      <div class="relative w-12 h-12 shrink-0"> <img src="/assets/images/mock_data/placeholder_pfp.jpeg" alt="" class="object-cover w-full h-full rounded-full"></div>
                      <div class="flex-1 "> 
                          <p> <b class="font-bold mr-1"> John Michael</b> who you might know,  is on Instello.</p>
                          <div class="text-xs text-gray-500 mt-1.5 dark:text-white/80"> 2 hours ago </div>
                      </div>
                      <button type="button" class="button text-white bg-primary">fallow</button>
                  </a> -->


                  <div class="border-t px-5 py-3 -mx-2 mt-4 dark:border-slate-700/40">
                      <h4 class="font-thin text-white mb-5">General</h4>
                  </div>

                  
                  <!-- <a href="#" class="relative flex items-center gap-3 p-2 duration-200 rounded-xl hover:bg-secondery">
                      <div class="relative w-12 h-12 shrink-0"> <img src="/assets/images/mock_data/placeholder_pfp.jpeg" alt="" class="object-cover w-full h-full rounded-full"></div>
                      <div class="flex-1 ">
                          <p> <b class="font-bold mr-1"> Jesse Steeve</b> sarah tagged you <br> in a photo of your birthday party. 📸 </p>
                          <div class="text-xs text-gray-500 mt-1.5 dark:text-white/80"> 8 hours ago </div>
                      </div> 
                  </a> -->

                  
              </div>

          </div>
        </div> 



      </nav>

      <!-- profile -->
      <div>
        <a id="profile-link" class="flex items-center gap-3 p-3 group text-neutral-800 dark:text-white" >
          <div
            class="rounded-full md:w-7 md:h-7 w-5 h-5 shrink-0 overflow-hidden flex flex-col justify-center items-center"
          >
            <img
              v-if="auth.user"
              :src="
                auth?.user?.profile_picture
                  ? auth?.user?.profile_picture.url
                  : '/assets/images/mock_data/placeholder_pfp.jpeg'
              "
              :alt="`${auth?.user?.first_name} ${auth?.user?.last_name} `"
              class="w-[110%]"
            />
          </div>
          <span class="font-semibold text-sm max-xl:hidden">
            {{ auth?.user?.first_name }} {{ auth?.user?.last_name }} 
          </span>
        </a>

        <div
          class="bg-white sm:w-64 2xl:w-[calc(100%-16px)] w-full shadow-lg border rounded-xl overflow-hidden max-md:!top-auto max-md:bottom-16 border2 dark:bg-zinc-900 hidden"
          uk-drop="animation:uk-animation-slide-bottom-medium ;animate-out: true"
        >
          <div
            class="w-full h-1.5 bg-gradient-to-r to-amber-500 via-amber-500 from-yellow-500"
          ></div>

          <div class="p-4 text-xs font-medium">
            <a
              :href="`/members/${auth.user?.nsight_id?.nsight_id}`"
              class="text-neutral-800 dark:text-white"
            >
              <div
                class="w-8 h-8 rounded-full overflow-hidden flex flex-col justify-center items-center"
              >
                <img
                  :src="
                    auth?.user?.profile_picture
                      ? auth?.user?.profile_picture.url
                      : '/assets/images/mock_data/placeholder_pfp.jpeg'
                  "
                  :alt="`${auth?.user?.first_name} ${auth?.user?.last_name} `"
                  class="w-[110%]"
                />
              </div>
              <div class="mt-2 space-y-0.5">
                <div class="text-base font-semibold">
                  {{ auth?.user?.first_name }} {{ auth?.user?.last_name }}
                </div>
                <!-- <div class="text-gray-400 dark:text-white/80"> @monroe </div> -->
              </div>
            </a>
            <!-- <font-awesome-icon 
              class="text-neutral-900 dark:text-white text-sm me-2 hover:cursor-pointer mb-[-1rem]" 
              :icon="[ 'fas', `${settings.dark_mode ? 'sun' : 'moon'}` ]"
              @click="settings.toggleLighting()"
            /> -->
            <!-- <div class="mt-3 flex gap-3.5">
                      <div> <a href="profile.html"> <strong> 620K </strong> <span class="text-gray-400 dark:text-white/80 ml-1">Following </span> </a> </div>
                      <div> <a href="profile.html"> <strong> 38k </strong> <span class="text-gray-400 dark:text-white/80 ml-1">Followers </span> </a>  </div>
                  </div> -->
                
          </div>
          <hr class="opacity-60" />
          <ul class="text-sm font-semibold p-2">
            <li>
              <a :href="`/members/${auth?.user?.nsight_id?.nsight_id}`"
                class="flex gap-3 rounded-md p-2 text-neutral-800 dark:text-white hover:dark:text-zinc-100 hover:bg-zinc-300/30"
              >
                Profile
              </a>
            </li>
            <!-- <li> <a href="upgrade.html" class="flex gap-3 rounded-md p-2 text-neutral-800 dark:text-white hover:dark:text-zinc-100 hover:bg-zinc-300/30"> Upgrade </a></li>  -->
            <li>
              <a
                href="/account"
                class="flex gap-3 rounded-md p-2 text-neutral-800 dark:text-white hover:dark:text-zinc-100 hover:bg-zinc-300/30"
              >
                Account Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                @click="sign_out"
                class="flex gap-3 rounded-md p-2 text-neutral-800 dark:text-white hover:dark:text-zinc-100 hover:bg-zinc-300/30"
              >
                Log Out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

      <!-- Toasts -->
    <div class="ctr-toasts flex flex-col absolute right-[1rem] top-[1rem] left-[80vw] z-50  w-[300px]">
      <div
        v-for="(toast, index) in state.toasts"
        :key="index"
        class="toast flex items-center justify-between p-3 rounded-lg shadow-lg text-white mb-2 fade-in"
        :class="toast.type == 'success' ? 'bg-green-500 border-2 border-green-900' : 'bg-red-100'"
      >
        <div class="flex flex-row justify-between items-center w-full">
          <div class="flex-1"></div>
          <div class="flex flex-col justify-start text-start">
            <div class="text-sm font-semibold">{{ toast.title }}</div>
            <div class="text-sm me-5">{{ toast.message }}</div>
          </div>
          <div class="flex flex-col justify-start align-start items-start w-[20px] h-[40px]">
              <!-- removal button -->
            <button
              @click="state.toasts.splice(index, 1)"
              class="text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
import logo from "~/assets/images/logo/nsight_clear.png";

  // Setup
const config = useRuntimeConfig();
import qs from "qs";

// State
const state = reactive({
  drawer: false,
  search: {
    query: "",
    results: [],
    searching: false,
    loading: false,
  },
  notifications: {
    friend_requests: [],
    messages: [],
    total: 0,
  },
  // Any:
  toasts: [] as any[],
});
// Stores
const auth = authStore()
const prodStore = productsStore();
const settings = settingsStore();

// Components
import FriendRequest from './components/friend-requests/friend_request.vue'


// methods
const sign_out = async () => {
  await auth.logout();
};


// Shop:
const goToCart = () => {
  navigateTo("/cart");
};

// Searching
const toggleSearch = () => {
  state.search.searching = !state.search.searching;
};
const doSearch = () => {
  // console.log('searching', state.search)
};


// General
const toggle_theme = () => {
  auth.user.preferences[0].dark_mode = !auth.user.preferences[0].dark_mode
  auth.updateUser()
  nextTick(() => {
    settings.dark_mode = auth.user.preferences[0].dark_mode
  })
}

// Notifications
const getFriendRequests = async () => {
  
  if (!auth?.user?.pending_friends?.data?.length) {
    state.notifications.friend_requests = [];
    return;
  }

// auth?.user?.pending_friends?.data
  try {
    $fetch(`${config.public.NUXT_STRAPI_URL}/api/users?${qs.stringify({
      populate: [
        "username",
        "first_name",
        "last_name",
        "profile_picture", 
        "pending_friends",
        "nsight_id",
        "friends"
      ],
      filters: {
          nsight_id: {
            nsight_id: {
              $in: auth?.user?.pending_friends?.data
            }
          }
        }
    })}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`
      }
    }).then(async (result) => {
      // console.log('Friend requests', result)
      state.notifications.friend_requests =  result
        nextTick(async() => {
      await notifications_total()
    })
    }).catch((error) => {
      console.log('Error getting friend requests', error)
    })
  } catch (error) {
    console.log('Error getting friend requests', error)
  }  
}

const notifications_total = async () => {
  state.notifications.total = 
    state.notifications?.friend_requests?.length + 
    state.notifications?.messages?.length;
}


const getNotifications = async (toast: any) => {
  // console.log('getting notifications')
  if(toast) {
    console.log('toast', toast)
    state.toasts.push(toast)
    // Cascade removal of toasts interval:
    setTimeout(() => {
      state.toasts.shift()
    }, 5000)
  }

  state.notifications.total = 0

  // Get friend requests
  await getFriendRequests()
  

}

// Mounted
onMounted(() => {
  getNotifications(false)
})


</script>
<style lang="scss">
a {
  &:hover {
    text-decoration: none !important;
  }
}
</style>
