globalThis._importMeta_={url:import.meta.url,env:process.env};import { Server } from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { mkdirSync } from 'node:fs';
import { parentPort, threadId } from 'node:worker_threads';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, isEvent, createEvent, getRequestHeader, eventHandler, setHeaders, sendRedirect, proxyRequest, setResponseHeader, send, getResponseStatus, setResponseStatus, setResponseHeaders, getRequestHeaders, setHeader, sendError, H3Error, createApp, createRouter as createRouter$1, toNodeListener, fetchWithEvent, lazyEventHandler, readBody, createEventStream, defineWebSocketHandler, getQuery as getQuery$1, createError, getResponseStatusText } from 'file:///Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend/node_modules/h3/dist/index.mjs';
import postmark from 'file:///Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend/node_modules/postmark/dist/index.js';
import qs from 'file:///Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend/node_modules/qs/lib/index.js';
import crypto from 'crypto';
import { SquareClient, SquareEnvironment } from 'file:///Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend/node_modules/square/index.js';
import JSONBig from 'file:///Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend/node_modules/json-bigint/index.js';
import { v2 } from 'file:///Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend/node_modules/cloudinary/cloudinary.js';
import multiparty from 'file:///Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend/node_modules/multiparty/index.js';
import fs from 'fs';
import { getRequestDependencies, getPreloadLinks, getPrefetchLinks, createRenderer } from 'file:///Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { stringify, uneval } from 'file:///Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend/node_modules/devalue/index.js';
import { renderSSRHead } from 'file:///Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend/node_modules/@unhead/ssr/dist/index.mjs';
import { createFetch as createFetch$1, Headers as Headers$1 } from 'file:///Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend/node_modules/ofetch/dist/node.mjs';
import destr from 'file:///Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend/node_modules/destr/dist/index.mjs';
import { createCall, createFetch } from 'file:///Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend/node_modules/unenv/runtime/fetch/index.mjs';
import { createHooks } from 'file:///Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend/node_modules/hookable/dist/index.mjs';
import { snakeCase } from 'file:///Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend/node_modules/scule/dist/index.mjs';
import { klona } from 'file:///Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file:///Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend/node_modules/defu/dist/defu.mjs';
import { hash } from 'file:///Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend/node_modules/ohash/dist/index.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery } from 'file:///Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend/node_modules/ufo/dist/index.mjs';
import { createStorage, prefixStorage } from 'file:///Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file:///Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend/node_modules/unstorage/drivers/fs.mjs';
import { toRouteMatcher, createRouter } from 'file:///Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend/node_modules/radix3/dist/index.mjs';
import * as vue$1 from 'file:///Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend/node_modules/vue/index.mjs';
import { version, unref } from 'file:///Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend/node_modules/vue/index.mjs';
import wellKnownOptions from 'file:///Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend/.nuxt/well-known.mjs';
import { createServerHead as createServerHead$1 } from 'file:///Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend/node_modules/unhead/dist/index.mjs';
import { defineHeadPlugin } from 'file:///Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend/node_modules/@unhead/shared/dist/index.mjs';

const r=Object.create(null),E=e=>globalThis.process?.env||globalThis._importMeta_.env||globalThis.Deno?.env.toObject()||globalThis.__env__||(e?r:globalThis),s=new Proxy(r,{get(e,o){return E()[o]??r[o]},has(e,o){const i=E();return o in i||o in r},set(e,o,i){const g=E(!0);return g[o]=i,!0},deleteProperty(e,o){if(!o)return !1;const i=E(!0);return delete i[o],!0},ownKeys(){const e=E(!0);return Object.keys(e)}}),t=typeof process<"u"&&process.env&&"development"||"",p=[["APPVEYOR"],["AWS_AMPLIFY","AWS_APP_ID",{ci:!0}],["AZURE_PIPELINES","SYSTEM_TEAMFOUNDATIONCOLLECTIONURI"],["AZURE_STATIC","INPUT_AZURE_STATIC_WEB_APPS_API_TOKEN"],["APPCIRCLE","AC_APPCIRCLE"],["BAMBOO","bamboo_planKey"],["BITBUCKET","BITBUCKET_COMMIT"],["BITRISE","BITRISE_IO"],["BUDDY","BUDDY_WORKSPACE_ID"],["BUILDKITE"],["CIRCLE","CIRCLECI"],["CIRRUS","CIRRUS_CI"],["CLOUDFLARE_PAGES","CF_PAGES",{ci:!0}],["CODEBUILD","CODEBUILD_BUILD_ARN"],["CODEFRESH","CF_BUILD_ID"],["DRONE"],["DRONE","DRONE_BUILD_EVENT"],["DSARI"],["GITHUB_ACTIONS"],["GITLAB","GITLAB_CI"],["GITLAB","CI_MERGE_REQUEST_ID"],["GOCD","GO_PIPELINE_LABEL"],["LAYERCI"],["HUDSON","HUDSON_URL"],["JENKINS","JENKINS_URL"],["MAGNUM"],["NETLIFY"],["NETLIFY","NETLIFY_LOCAL",{ci:!1}],["NEVERCODE"],["RENDER"],["SAIL","SAILCI"],["SEMAPHORE"],["SCREWDRIVER"],["SHIPPABLE"],["SOLANO","TDDIUM"],["STRIDER"],["TEAMCITY","TEAMCITY_VERSION"],["TRAVIS"],["VERCEL","NOW_BUILDER"],["VERCEL","VERCEL",{ci:!1}],["VERCEL","VERCEL_ENV",{ci:!1}],["APPCENTER","APPCENTER_BUILD_ID"],["CODESANDBOX","CODESANDBOX_SSE",{ci:!1}],["STACKBLITZ"],["STORMKIT"],["CLEAVR"],["ZEABUR"],["CODESPHERE","CODESPHERE_APP_ID",{ci:!0}],["RAILWAY","RAILWAY_PROJECT_ID"],["RAILWAY","RAILWAY_SERVICE_ID"]];function B(){if(globalThis.process?.env)for(const e of p){const o=e[1]||e[0];if(globalThis.process?.env[o])return {name:e[0].toLowerCase(),...e[2]}}return globalThis.process?.env?.SHELL==="/bin/jsh"&&globalThis.process?.versions?.webcontainer?{name:"stackblitz",ci:!1}:{name:"",ci:!1}}const l=B(),d=l.name;function n(e){return e?e!=="false":!1}const I=globalThis.process?.platform||"",T=n(s.CI)||l.ci!==!1,R=n(globalThis.process?.stdout&&globalThis.process?.stdout.isTTY);n(s.DEBUG);const C=t==="test"||n(s.TEST);n(s.MINIMAL)||T||C||!R;const a=/^win/i.test(I);!n(s.NO_COLOR)&&(n(s.FORCE_COLOR)||(R||a)&&s.TERM!=="dumb"||T);const _=(globalThis.process?.versions?.node||"").replace(/^v/,"")||null;Number(_?.split(".")[0])||null;const W=globalThis.process||Object.create(null),c={versions:{}};new Proxy(W,{get(e,o){if(o==="env")return s;if(o in e)return e[o];if(o in c)return c[o]}});const A=globalThis.process?.release?.name==="node",L=!!globalThis.Bun||!!globalThis.process?.versions?.bun,D=!!globalThis.Deno,O=!!globalThis.fastly,S=!!globalThis.Netlify,N=!!globalThis.EdgeRuntime,u=globalThis.navigator?.userAgent==="Cloudflare-Workers",b=!!globalThis.__lagon__,F=[[S,"netlify"],[N,"edge-light"],[u,"workerd"],[O,"fastly"],[D,"deno"],[L,"bun"],[A,"node"],[b,"lagon"]];function G(){const e=F.find(o=>o[0]);if(e)return {name:e[1]}}const P=G();P?.name||"";

const inlineAppConfig = {
  "nuxt": {
    "buildId": "dev"
  }
};



const appConfig = defuFn(inlineAppConfig);

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      }
    }
  },
  "public": {
    "NUXT_STRAPI_URL": "http://localhost:1337",
    "NUXT_MEDUSA_BACKEND_URL": "http://localhost:9000",
    "SQUARE_APPLICATION_ID": "sandbox-sq0idb-VCYdx69D6rLhxiNTAUFV_Q",
    "SQUARE_LOCATION_ID": "L56F5MJM7AFC7",
    "SQUARE_ACCESS_TOKEN": "EAAAlzaGxomxKQFqliNDihMJ4I4l1CpMN90rVRBR1L44k8lr8mFgPq9-f9WP7nda",
    "SQUARE_ENVIRONMENT": "sandbox",
    "persistedState": {
      "storage": "cookies",
      "debug": false,
      "cookieOptions": {}
    },
    "primevue": {
      "usePrimeVue": true,
      "resolvePath": "",
      "cssLayerOrder": "tailwind-base, primvevue, tailwind-utilities",
      "importPT": {
        "as": "Tailwind",
        "from": "primevue/passthrough/tailwind"
      },
      "options": {
        "unstyled": false,
        "importPT": {
          "from": "/Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend/presets/nsight_style_presets"
        },
        "ripple": true
      },
      "components": [
        {
          "name": "PrimeAutoComplete",
          "as": "AutoComplete",
          "from": "primevue/autocomplete",
          "export": "default",
          "filePath": "primevue/autocomplete",
          "global": true
        },
        {
          "name": "PrimeInputNumber",
          "as": "InputNumber",
          "from": "primevue/inputnumber",
          "export": "default",
          "filePath": "primevue/inputnumber",
          "global": true
        },
        {
          "name": "PrimeButton",
          "as": "Button",
          "from": "primevue/button",
          "export": "default",
          "filePath": "primevue/button",
          "global": true
        },
        {
          "name": "PrimeColumn",
          "as": "Column",
          "from": "primevue/column",
          "export": "default",
          "filePath": "primevue/column",
          "global": true
        },
        {
          "name": "PrimeDataTable",
          "as": "DataTable",
          "from": "primevue/datatable",
          "export": "default",
          "filePath": "primevue/datatable",
          "global": true
        },
        {
          "name": "PrimeAccordion",
          "as": "Accordion",
          "from": "primevue/accordion",
          "export": "default",
          "filePath": "primevue/accordion",
          "global": true
        },
        {
          "name": "PrimeAccordionTab",
          "as": "AccordionTab",
          "from": "primevue/accordiontab",
          "export": "default",
          "filePath": "primevue/accordiontab",
          "global": true
        },
        {
          "name": "PrimeTabView",
          "as": "TabView",
          "from": "primevue/tabview",
          "export": "default",
          "filePath": "primevue/tabview",
          "global": true
        },
        {
          "name": "PrimeTabPanel",
          "as": "TabPanel",
          "from": "primevue/tabpanel",
          "export": "default",
          "filePath": "primevue/tabpanel",
          "global": true
        },
        {
          "name": "PrimeDialog",
          "as": "Dialog",
          "from": "primevue/dialog",
          "export": "default",
          "filePath": "primevue/dialog",
          "global": true
        },
        {
          "name": "PrimeToast",
          "use": {
            "as": "ToastService"
          },
          "as": "Toast",
          "from": "primevue/toast",
          "export": "default",
          "filePath": "primevue/toast",
          "global": true
        },
        {
          "name": "PrimeCarousel",
          "as": "Carousel",
          "from": "primevue/carousel",
          "export": "default",
          "filePath": "primevue/carousel",
          "global": true
        },
        {
          "name": "PrimeProgressSpinner",
          "as": "ProgressSpinner",
          "from": "primevue/progressspinner",
          "export": "default",
          "filePath": "primevue/progressspinner",
          "global": true
        }
      ],
      "directives": [
        {
          "name": "tooltip",
          "as": "Tooltip",
          "from": "primevue/tooltip"
        }
      ],
      "composables": [
        {
          "name": "usePrimeVue",
          "as": "usePrimeVue",
          "from": "primevue/config"
        },
        {
          "name": "useStyle",
          "as": "useStyle",
          "from": "primevue/usestyle"
        },
        {
          "name": "useConfirm",
          "as": "useConfirm",
          "from": "primevue/useconfirm"
        },
        {
          "name": "useToast",
          "as": "useToast",
          "from": "primevue/usetoast"
        },
        {
          "name": "useDialog",
          "as": "useDialog",
          "from": "primevue/usedialog"
        }
      ],
      "config": [
        {
          "name": "PrimeVue",
          "as": "PrimeVue",
          "from": "primevue/config"
        }
      ],
      "services": [
        {
          "name": "ToastService",
          "as": "ToastService",
          "from": "primevue/toastservice"
        }
      ],
      "styles": [
        {
          "name": "BaseStyle",
          "as": "BaseStyle",
          "from": "primevue/base/style"
        },
        {
          "name": "BaseComponentStyle",
          "as": "BaseComponentStyle",
          "from": "primevue/basecomponent/style"
        },
        {
          "name": "AutoCompleteStyle",
          "as": "AutoCompleteStyle",
          "from": "primevue/autocomplete/style"
        },
        {
          "name": "InputNumberStyle",
          "as": "InputNumberStyle",
          "from": "primevue/inputnumber/style"
        },
        {
          "name": "ButtonStyle",
          "as": "ButtonStyle",
          "from": "primevue/button/style"
        },
        {
          "name": "ColumnStyle",
          "as": "ColumnStyle",
          "from": "primevue/column/style"
        },
        {
          "name": "DataTableStyle",
          "as": "DataTableStyle",
          "from": "primevue/datatable/style"
        },
        {
          "name": "AccordionStyle",
          "as": "AccordionStyle",
          "from": "primevue/accordion/style"
        },
        {
          "name": "AccordionTabStyle",
          "as": "AccordionTabStyle",
          "from": "primevue/accordiontab/style"
        },
        {
          "name": "TabViewStyle",
          "as": "TabViewStyle",
          "from": "primevue/tabview/style"
        },
        {
          "name": "TabPanelStyle",
          "as": "TabPanelStyle",
          "from": "primevue/tabpanel/style"
        },
        {
          "name": "DialogStyle",
          "as": "DialogStyle",
          "from": "primevue/dialog/style"
        },
        {
          "name": "ToastStyle",
          "as": "ToastStyle",
          "from": "primevue/toast/style"
        },
        {
          "name": "CarouselStyle",
          "as": "CarouselStyle",
          "from": "primevue/carousel/style"
        },
        {
          "name": "ProgressSpinnerStyle",
          "as": "ProgressSpinnerStyle",
          "from": "primevue/progressspinner/style"
        },
        {
          "name": "TooltipStyle",
          "as": "TooltipStyle",
          "from": "primevue/tooltip/style"
        }
      ],
      "injectStylesAsString": [],
      "injectStylesAsStringToTop": [
        "'<style type=\"text/css\" data-primevue-style-id=\"layer-order\" >@layer tailwind-base, primvevue, tailwind-utilities</style>'"
      ]
    },
    "wellKnown": {
      "devtools": true,
      "contentUris": [
        {
          "path": "apple-developer-merchantid-domain-association",
          "content": "7B227073704964223A2242383642463746383933373735353242343346373441324434304635313141343141334233383342463146384542463741443644463733303342413638363031222C2276657273696F6E223A312C22637265617465644F6E223A313536383233353938323733352C227369676E6174757265223A2233303830303630393261383634383836663730643031303730326130383033303830303230313031333130663330306430363039363038363438303136353033303430323031303530303330383030363039326138363438383666373064303130373031303030306130383033303832303365333330383230333838613030333032303130323032303834633330343134393531396435343336333030613036303832613836343863653364303430333032333037613331326533303263303630333535303430333063323534313730373036633635323034313730373036633639363336313734363936663665323034393665373436353637373236313734363936663665323034333431323032643230343733333331323633303234303630333535303430623063316434313730373036633635323034333635373237343639363636393633363137343639366636653230343137353734363836663732363937343739333131333330313130363033353530343061306330613431373037303663363532303439366536333265333130623330303930363033353530343036313330323535353333303165313730643331333933303335333133383330333133333332333533373561313730643332333433303335333133363330333133333332333533373561333035663331323533303233303630333535303430333063316336353633363332643733366437303264363237323666366236353732326437333639363736653566353534333334326435303532346634343331313433303132303630333535303430623063306236393466353332303533373937333734363536643733333131333330313130363033353530343061306330613431373037303663363532303439366536333265333130623330303930363033353530343036313330323535353333303539333031333036303732613836343863653364303230313036303832613836343863653364303330313037303334323030303463323135373765646562643663376232323138663638646437303930613132313864633762306264366632633238336438343630393564393461663461353431316238333432306564383131663334303765383333333166316335346333663765623332323064366261643564346566663439323839383933653763306631336133383230323131333038323032306433303063303630333535316431333031303166663034303233303030333031663036303335353164323330343138333031363830313432336632343963343466393365346566323765366334663632383663336661326262666432653462333034353036303832623036303130353035303730313031303433393330333733303335303630383262303630313035303530373330303138363239363837343734373033613266326636663633373337303265363137303730366336353265363336663664326636663633373337303330333432643631373037303663363536313639363336313333333033323330383230313164303630333535316432303034383230313134333038323031313033303832303130633036303932613836343838366637363336343035303133303831666533303831633330363038326230363031303530353037303230323330383162363063383162333532363536633639363136653633363532303666366532303734363836393733323036333635373237343639363636393633363137343635323036323739323036313665373932303730363137323734373932303631373337333735366436353733323036313633363336353730373436313665363336353230366636363230373436383635323037343638363536653230363137303730366336393633363136323663363532303733373436313665363436313732363432303734363537323664373332303631366536343230363336663665363436393734363936663665373332303666363632303735373336353263323036333635373237343639363636393633363137343635323037303666366336393633373932303631366536343230363336353732373436393636363936333631373436393666366532303730373236313633373436393633363532303733373436313734363536643635366537343733326533303336303630383262303630313035303530373032303131363261363837343734373033613266326637373737373732653631373037303663363532653633366636643266363336353732373436393636363936333631373436353631373537343638366637323639373437393266333033343036303335353164316630343264333032623330323961303237613032353836323336383734373437303361326632663633373236633265363137303730366336353265363336663664326636313730373036633635363136393633363133333265363337323663333031643036303335353164306530343136303431343934353764623666643537343831383638393839373632663765353738353037653739623538323433303065303630333535316430663031303166663034303430333032303738303330306630363039326138363438383666373633363430363164303430323035303033303061303630383261383634386365336430343033303230333439303033303436303232313030626530393537316665373165316537333562353565356166616362346337326665623434356633303138353232326337323531303032623631656264366635353032323130306431386233353061356464366464366562313734363033356231316562326365383763666133653661663663626438333830383930646338326364646161363333303832303265653330383230323735613030333032303130323032303834393664326662663361393864613937333030613036303832613836343863653364303430333032333036373331316233303139303630333535303430333063313234313730373036633635323035323666366637343230343334313230326432303437333333313236333032343036303335353034306230633164343137303730366336353230343336353732373436393636363936333631373436393666366532303431373537343638366637323639373437393331313333303131303630333535303430613063306134313730373036633635323034393665363332653331306233303039303630333535303430363133303235353533333031653137306433313334333033353330333633323333333433363333333035613137306433323339333033353330333633323333333433363333333035613330376133313265333032633036303335353034303330633235343137303730366336353230343137303730366336393633363137343639366636653230343936653734363536373732363137343639366636653230343334313230326432303437333333313236333032343036303335353034306230633164343137303730366336353230343336353732373436393636363936333631373436393666366532303431373537343638366637323639373437393331313333303131303630333535303430613063306134313730373036633635323034393665363332653331306233303039303630333535303430363133303235353533333035393330313330363037326138363438636533643032303130363038326138363438636533643033303130373033343230303034663031373131383431396437363438356435316135653235383130373736653838306132656664653762616534646530386466633462393365313333353664353636356233356165323264303937373630643232346537626261303866643736313763653838636237366262363637306265633865383239383466663534343561333831663733303831663433303436303630383262303630313035303530373031303130343361333033383330333630363038326230363031303530353037333030313836326136383734373437303361326632663666363337333730326536313730373036633635326536333666366432663666363337333730333033343264363137303730366336353732366636663734363336313637333333303164303630333535316430653034313630343134323366323439633434663933653465663237653663346636323836633366613262626664326534623330306630363033353531643133303130316666303430353330303330313031666633303166303630333535316432333034313833303136383031346262623064656131353833333838396161343861393964656265626465626166646163623234616233303337303630333535316431663034333033303265333032636130326161303238383632363638373437343730336132663266363337323663326536313730373036633635326536333666366432663631373037303663363537323666366637343633363136373333326536333732366333303065303630333535316430663031303166663034303430333032303130363330313030363061326138363438383666373633363430363032306530343032303530303330306130363038326138363438636533643034303330323033363730303330363430323330336163663732383335313136393962313836666233356333353663613632626666343137656464393066373534646132386562656631396338313565343262373839663839386637396235393966393864353431306438663964653963326665303233303332326464353434323162306133303537373663356466333338336239303637666431373763326332313664393634666336373236393832313236663534663837613764316239396362396230393839323136313036393930663039393231643030303033313832303138643330383230313839303230313031333038313836333037613331326533303263303630333535303430333063323534313730373036633635323034313730373036633639363336313734363936663665323034393665373436353637373236313734363936663665323034333431323032643230343733333331323633303234303630333535303430623063316434313730373036633635323034333635373237343639363636393633363137343639366636653230343137353734363836663732363937343739333131333330313130363033353530343061306330613431373037303663363532303439366536333265333130623330303930363033353530343036313330323535353330323038346333303431343935313964353433363330306430363039363038363438303136353033303430323031303530306130383139353330313830363039326138363438383666373064303130393033333130623036303932613836343838366637306430313037303133303163303630393261383634383836663730643031303930353331306631373064333133393330333933313331333233313330333633323332356133303261303630393261383634383836663730643031303933343331316433303162333030643036303936303836343830313635303330343032303130353030613130613036303832613836343863653364303430333032333032663036303932613836343838366637306430313039303433313232303432303035653263653630303463633537663434663931623466376434383432356565323662623035303037663961343134653537656664376134323536653537373933303061303630383261383634386365336430343033303230343438333034363032323130306537653432343437313461346335656262373966623136313461613439363731366165393364303833343061616339313438333830653462633235333831666530323231303062363564316532353365313135393832623535653834363032636134316536613366363038626562373735336232343130313662386137323637666138356530303030303030303030303030227D"
        },
        {
          "path": "content-uri.txt",
          "content": "content-uri"
        }
      ]
    }
  },
  "apiSecret": "",
  "square": {
    "applicationId": "sandbox-sq0idb-VCYdx69D6rLhxiNTAUFV_Q",
    "locationId": "L56F5MJM7AFC7",
    "accessToken": "EAAAlzaGxomxKQFqliNDihMJ4I4l1CpMN90rVRBR1L44k8lr8mFgPq9-f9WP7nda",
    "environment": "sandbox"
  }
};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const _sharedRuntimeConfig = _deepFreeze(
  _applyEnv(klona(_inlineRuntimeConfig))
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  _applyEnv(runtimeConfig);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _getEnv(key) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function _applyEnv(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = _getEnv(subKey);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      _applyEnv(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
  return obj;
}
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

const serverAssets = [{"baseName":"server","dir":"/Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend/server/assets"}];

const assets = createStorage();

for (const asset of serverAssets) {
  assets.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir }));
}

const storage = createStorage({});

storage.mount('/assets', assets);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend/server","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend/.nuxt","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend/.nuxt/cache","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"/Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend/.data/kv","ignore":["**/node_modules/**","**/.git/**"]}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          const promise = useStorage().setItem(cacheKey, entry).catch((error) => {
            console.error(`[nitro] [cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event && event.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[nitro] [cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      const _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        variableHeaders[header] = incomingEvent.node.req.headers[header];
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.context = incomingEvent.context;
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        event.node.res.setHeader(name, value);
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}
function _captureError(error, type) {
  console.error(`[nitro] [${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

const config$2 = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config$2.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(
        event,
        routeRules.redirect.to,
        routeRules.redirect.statusCode
      );
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function getDefaultExportFromNamespaceIfNotNamed (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
}

var usestyle_cjs = {};

var utils_cjs = {};

Object.defineProperty(utils_cjs, '__esModule', { value: true });

function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$3(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _toConsumableArray$3(arr) { return _arrayWithoutHoles$3(arr) || _iterableToArray$3(arr) || _unsupportedIterableToArray$3(arr) || _nonIterableSpread$3(); }
function _nonIterableSpread$3() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray$3(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$3(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$3(arr); }
function _typeof$3$1(o) { "@babel/helpers - typeof"; return _typeof$3$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$3$1(o); }
function _slicedToArray$1(arr, i) { return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$3(arr, i) || _nonIterableRest$1(); }
function _nonIterableRest$1() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$3(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }
function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$1(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles$1(arr) { if (Array.isArray(arr)) return arr; }
var DomHandler = {
  innerWidth: function innerWidth(el) {
    if (el) {
      var width = el.offsetWidth;
      var style = getComputedStyle(el);
      width += parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      return width;
    }
    return 0;
  },
  width: function width(el) {
    if (el) {
      var width = el.offsetWidth;
      var style = getComputedStyle(el);
      width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      return width;
    }
    return 0;
  },
  getWindowScrollTop: function getWindowScrollTop() {
    var doc = document.documentElement;
    return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  },
  getWindowScrollLeft: function getWindowScrollLeft() {
    var doc = document.documentElement;
    return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  },
  getOuterWidth: function getOuterWidth(el, margin) {
    if (el) {
      var width = el.offsetWidth;
      if (margin) {
        var style = getComputedStyle(el);
        width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
      }
      return width;
    }
    return 0;
  },
  getOuterHeight: function getOuterHeight(el, margin) {
    if (el) {
      var height = el.offsetHeight;
      if (margin) {
        var style = getComputedStyle(el);
        height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
      }
      return height;
    }
    return 0;
  },
  getClientHeight: function getClientHeight(el, margin) {
    if (el) {
      var height = el.clientHeight;
      if (margin) {
        var style = getComputedStyle(el);
        height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
      }
      return height;
    }
    return 0;
  },
  getViewport: function getViewport() {
    var win = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      w = win.innerWidth || e.clientWidth || g.clientWidth,
      h = win.innerHeight || e.clientHeight || g.clientHeight;
    return {
      width: w,
      height: h
    };
  },
  getOffset: function getOffset(el) {
    if (el) {
      var rect = el.getBoundingClientRect();
      return {
        top: rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),
        left: rect.left + (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0)
      };
    }
    return {
      top: 'auto',
      left: 'auto'
    };
  },
  index: function index(element) {
    if (element) {
      var _this$getParentNode;
      var children = (_this$getParentNode = this.getParentNode(element)) === null || _this$getParentNode === void 0 ? void 0 : _this$getParentNode.childNodes;
      var num = 0;
      for (var i = 0; i < children.length; i++) {
        if (children[i] === element) return num;
        if (children[i].nodeType === 1) num++;
      }
    }
    return -1;
  },
  addMultipleClasses: function addMultipleClasses(element, classNames) {
    var _this = this;
    if (element && classNames) {
      [classNames].flat().filter(Boolean).forEach(function (cNames) {
        return cNames.split(' ').forEach(function (className) {
          return _this.addClass(element, className);
        });
      });
    }
  },
  removeMultipleClasses: function removeMultipleClasses(element, classNames) {
    var _this2 = this;
    if (element && classNames) {
      [classNames].flat().filter(Boolean).forEach(function (cNames) {
        return cNames.split(' ').forEach(function (className) {
          return _this2.removeClass(element, className);
        });
      });
    }
  },
  addClass: function addClass(element, className) {
    if (element && className && !this.hasClass(element, className)) {
      if (element.classList) element.classList.add(className);else element.className += ' ' + className;
    }
  },
  removeClass: function removeClass(element, className) {
    if (element && className) {
      if (element.classList) element.classList.remove(className);else element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  },
  hasClass: function hasClass(element, className) {
    if (element) {
      if (element.classList) return element.classList.contains(className);else return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
    }
    return false;
  },
  addStyles: function addStyles(element) {
    var styles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (element) {
      Object.entries(styles).forEach(function (_ref) {
        var _ref2 = _slicedToArray$1(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];
        return element.style[key] = value;
      });
    }
  },
  find: function find(element, selector) {
    return this.isElement(element) ? element.querySelectorAll(selector) : [];
  },
  findSingle: function findSingle(element, selector) {
    return this.isElement(element) ? element.querySelector(selector) : null;
  },
  createElement: function createElement(type) {
    var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (type) {
      var element = document.createElement(type);
      this.setAttributes(element, attributes);
      for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
      }
      element.append.apply(element, children);
      return element;
    }
    return undefined;
  },
  setAttribute: function setAttribute(element) {
    var attribute = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var value = arguments.length > 2 ? arguments[2] : undefined;
    if (this.isElement(element) && value !== null && value !== undefined) {
      element.setAttribute(attribute, value);
    }
  },
  setAttributes: function setAttributes(element) {
    var _this3 = this;
    var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (this.isElement(element)) {
      var computedStyles = function computedStyles(rule, value) {
        var _element$$attrs, _element$$attrs2;
        var styles = element !== null && element !== void 0 && (_element$$attrs = element.$attrs) !== null && _element$$attrs !== void 0 && _element$$attrs[rule] ? [element === null || element === void 0 || (_element$$attrs2 = element.$attrs) === null || _element$$attrs2 === void 0 ? void 0 : _element$$attrs2[rule]] : [];
        return [value].flat().reduce(function (cv, v) {
          if (v !== null && v !== undefined) {
            var type = _typeof$3$1(v);
            if (type === 'string' || type === 'number') {
              cv.push(v);
            } else if (type === 'object') {
              var _cv = Array.isArray(v) ? computedStyles(rule, v) : Object.entries(v).map(function (_ref3) {
                var _ref4 = _slicedToArray$1(_ref3, 2),
                  _k = _ref4[0],
                  _v = _ref4[1];
                return rule === 'style' && (!!_v || _v === 0) ? "".concat(_k.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(), ":").concat(_v) : !!_v ? _k : undefined;
              });
              cv = _cv.length ? cv.concat(_cv.filter(function (c) {
                return !!c;
              })) : cv;
            }
          }
          return cv;
        }, styles);
      };
      Object.entries(attributes).forEach(function (_ref5) {
        var _ref6 = _slicedToArray$1(_ref5, 2),
          key = _ref6[0],
          value = _ref6[1];
        if (value !== undefined && value !== null) {
          var matchedEvent = key.match(/^on(.+)/);
          if (matchedEvent) {
            element.addEventListener(matchedEvent[1].toLowerCase(), value);
          } else if (key === 'p-bind') {
            _this3.setAttributes(element, value);
          } else {
            value = key === 'class' ? _toConsumableArray$3(new Set(computedStyles('class', value))).join(' ').trim() : key === 'style' ? computedStyles('style', value).join(';').trim() : value;
            (element.$attrs = element.$attrs || {}) && (element.$attrs[key] = value);
            element.setAttribute(key, value);
          }
        }
      });
    }
  },
  getAttribute: function getAttribute(element, name) {
    if (this.isElement(element)) {
      var value = element.getAttribute(name);
      if (!isNaN(value)) {
        return +value;
      }
      if (value === 'true' || value === 'false') {
        return value === 'true';
      }
      return value;
    }
    return undefined;
  },
  isAttributeEquals: function isAttributeEquals(element, name, value) {
    return this.isElement(element) ? this.getAttribute(element, name) === value : false;
  },
  isAttributeNotEquals: function isAttributeNotEquals(element, name, value) {
    return !this.isAttributeEquals(element, name, value);
  },
  getHeight: function getHeight(el) {
    if (el) {
      var height = el.offsetHeight;
      var style = getComputedStyle(el);
      height -= parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
      return height;
    }
    return 0;
  },
  getWidth: function getWidth(el) {
    if (el) {
      var width = el.offsetWidth;
      var style = getComputedStyle(el);
      width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
      return width;
    }
    return 0;
  },
  absolutePosition: function absolutePosition(element, target) {
    var gutter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    if (element) {
      var elementDimensions = element.offsetParent ? {
        width: element.offsetWidth,
        height: element.offsetHeight
      } : this.getHiddenElementDimensions(element);
      var elementOuterHeight = elementDimensions.height;
      var elementOuterWidth = elementDimensions.width;
      var targetOuterHeight = target.offsetHeight;
      var targetOuterWidth = target.offsetWidth;
      var targetOffset = target.getBoundingClientRect();
      var windowScrollTop = this.getWindowScrollTop();
      var windowScrollLeft = this.getWindowScrollLeft();
      var viewport = this.getViewport();
      var top,
        left,
        origin = 'top';
      if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
        top = targetOffset.top + windowScrollTop - elementOuterHeight;
        origin = 'bottom';
        if (top < 0) {
          top = windowScrollTop;
        }
      } else {
        top = targetOuterHeight + targetOffset.top + windowScrollTop;
      }
      if (targetOffset.left + elementOuterWidth > viewport.width) left = Math.max(0, targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth);else left = targetOffset.left + windowScrollLeft;
      element.style.top = top + 'px';
      element.style.left = left + 'px';
      element.style.transformOrigin = origin;
      gutter && (element.style.marginTop = origin === 'bottom' ? 'calc(var(--p-anchor-gutter) * -1)' : 'calc(var(--p-anchor-gutter))');
    }
  },
  relativePosition: function relativePosition(element, target) {
    var gutter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    if (element) {
      var elementDimensions = element.offsetParent ? {
        width: element.offsetWidth,
        height: element.offsetHeight
      } : this.getHiddenElementDimensions(element);
      var targetHeight = target.offsetHeight;
      var targetOffset = target.getBoundingClientRect();
      var viewport = this.getViewport();
      var top,
        left,
        origin = 'top';
      if (targetOffset.top + targetHeight + elementDimensions.height > viewport.height) {
        top = -1 * elementDimensions.height;
        origin = 'bottom';
        if (targetOffset.top + top < 0) {
          top = -1 * targetOffset.top;
        }
      } else {
        top = targetHeight;
      }
      if (elementDimensions.width > viewport.width) {
        // element wider then viewport and cannot fit on screen (align at left side of viewport)
        left = targetOffset.left * -1;
      } else if (targetOffset.left + elementDimensions.width > viewport.width) {
        // element wider then viewport but can be fit on screen (align at right side of viewport)
        left = (targetOffset.left + elementDimensions.width - viewport.width) * -1;
      } else {
        // element fits on screen (align with target)
        left = 0;
      }
      element.style.top = top + 'px';
      element.style.left = left + 'px';
      element.style.transformOrigin = origin;
      gutter && (element.style.marginTop = origin === 'bottom' ? 'calc(var(--p-anchor-gutter) * -1)' : 'calc(var(--p-anchor-gutter))');
    }
  },
  nestedPosition: function nestedPosition(element, level) {
    if (element) {
      var parentItem = element.parentElement;
      var elementOffset = this.getOffset(parentItem);
      var viewport = this.getViewport();
      var sublistWidth = element.offsetParent ? element.offsetWidth : this.getHiddenElementOuterWidth(element);
      var itemOuterWidth = this.getOuterWidth(parentItem.children[0]);
      var left;
      if (parseInt(elementOffset.left, 10) + itemOuterWidth + sublistWidth > viewport.width - this.calculateScrollbarWidth()) {
        if (parseInt(elementOffset.left, 10) < sublistWidth) {
          // for too small screens
          if (level % 2 === 1) {
            left = parseInt(elementOffset.left, 10) ? '-' + parseInt(elementOffset.left, 10) + 'px' : '100%';
          } else if (level % 2 === 0) {
            left = viewport.width - sublistWidth - this.calculateScrollbarWidth() + 'px';
          }
        } else {
          left = '-100%';
        }
      } else {
        left = '100%';
      }
      element.style.top = '0px';
      element.style.left = left;
    }
  },
  getParentNode: function getParentNode(element) {
    var parent = element === null || element === void 0 ? void 0 : element.parentNode;
    if (parent && parent instanceof ShadowRoot && parent.host) {
      parent = parent.host;
    }
    return parent;
  },
  getParents: function getParents(element) {
    var parents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var parent = this.getParentNode(element);
    return parent === null ? parents : this.getParents(parent, parents.concat([parent]));
  },
  getScrollableParents: function getScrollableParents(element) {
    var scrollableParents = [];
    if (element) {
      var parents = this.getParents(element);
      var overflowRegex = /(auto|scroll)/;
      var overflowCheck = function overflowCheck(node) {
        try {
          var styleDeclaration = window['getComputedStyle'](node, null);
          return overflowRegex.test(styleDeclaration.getPropertyValue('overflow')) || overflowRegex.test(styleDeclaration.getPropertyValue('overflowX')) || overflowRegex.test(styleDeclaration.getPropertyValue('overflowY'));
        } catch (err) {
          return false;
        }
      };
      var _iterator = _createForOfIteratorHelper$1(parents),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var parent = _step.value;
          var scrollSelectors = parent.nodeType === 1 && parent.dataset['scrollselectors'];
          if (scrollSelectors) {
            var selectors = scrollSelectors.split(',');
            var _iterator2 = _createForOfIteratorHelper$1(selectors),
              _step2;
            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var selector = _step2.value;
                var el = this.findSingle(parent, selector);
                if (el && overflowCheck(el)) {
                  scrollableParents.push(el);
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          }
          if (parent.nodeType !== 9 && overflowCheck(parent)) {
            scrollableParents.push(parent);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    return scrollableParents;
  },
  getHiddenElementOuterHeight: function getHiddenElementOuterHeight(element) {
    if (element) {
      element.style.visibility = 'hidden';
      element.style.display = 'block';
      var elementHeight = element.offsetHeight;
      element.style.display = 'none';
      element.style.visibility = 'visible';
      return elementHeight;
    }
    return 0;
  },
  getHiddenElementOuterWidth: function getHiddenElementOuterWidth(element) {
    if (element) {
      element.style.visibility = 'hidden';
      element.style.display = 'block';
      var elementWidth = element.offsetWidth;
      element.style.display = 'none';
      element.style.visibility = 'visible';
      return elementWidth;
    }
    return 0;
  },
  getHiddenElementDimensions: function getHiddenElementDimensions(element) {
    if (element) {
      var dimensions = {};
      element.style.visibility = 'hidden';
      element.style.display = 'block';
      dimensions.width = element.offsetWidth;
      dimensions.height = element.offsetHeight;
      element.style.display = 'none';
      element.style.visibility = 'visible';
      return dimensions;
    }
    return 0;
  },
  fadeIn: function fadeIn(element, duration) {
    if (element) {
      element.style.opacity = 0;
      var last = +new Date();
      var opacity = 0;
      var tick = function tick() {
        opacity = +element.style.opacity + (new Date().getTime() - last) / duration;
        element.style.opacity = opacity;
        last = +new Date();
        if (+opacity < 1) {
          window.requestAnimationFrame && requestAnimationFrame(tick) || setTimeout(tick, 16);
        }
      };
      tick();
    }
  },
  fadeOut: function fadeOut(element, ms) {
    if (element) {
      var opacity = 1,
        interval = 50,
        duration = ms,
        gap = interval / duration;
      var fading = setInterval(function () {
        opacity -= gap;
        if (opacity <= 0) {
          opacity = 0;
          clearInterval(fading);
        }
        element.style.opacity = opacity;
      }, interval);
    }
  },
  getUserAgent: function getUserAgent() {
    return navigator.userAgent;
  },
  appendChild: function appendChild(element, target) {
    if (this.isElement(target)) target.appendChild(element);else if (target.el && target.elElement) target.elElement.appendChild(element);else throw new Error('Cannot append ' + target + ' to ' + element);
  },
  isElement: function isElement(obj) {
    return (typeof HTMLElement === "undefined" ? "undefined" : _typeof$3$1(HTMLElement)) === 'object' ? obj instanceof HTMLElement : obj && _typeof$3$1(obj) === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string';
  },
  scrollInView: function scrollInView(container, item) {
    var borderTopValue = getComputedStyle(container).getPropertyValue('borderTopWidth');
    var borderTop = borderTopValue ? parseFloat(borderTopValue) : 0;
    var paddingTopValue = getComputedStyle(container).getPropertyValue('paddingTop');
    var paddingTop = paddingTopValue ? parseFloat(paddingTopValue) : 0;
    var containerRect = container.getBoundingClientRect();
    var itemRect = item.getBoundingClientRect();
    var offset = itemRect.top + document.body.scrollTop - (containerRect.top + document.body.scrollTop) - borderTop - paddingTop;
    var scroll = container.scrollTop;
    var elementHeight = container.clientHeight;
    var itemHeight = this.getOuterHeight(item);
    if (offset < 0) {
      container.scrollTop = scroll + offset;
    } else if (offset + itemHeight > elementHeight) {
      container.scrollTop = scroll + offset - elementHeight + itemHeight;
    }
  },
  clearSelection: function clearSelection() {
    if (window.getSelection) {
      if (window.getSelection().empty) {
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges && window.getSelection().rangeCount > 0 && window.getSelection().getRangeAt(0).getClientRects().length > 0) {
        window.getSelection().removeAllRanges();
      }
    } else if (document['selection'] && document['selection'].empty) {
      try {
        document['selection'].empty();
      } catch (error) {
        //ignore IE bug
      }
    }
  },
  getSelection: function getSelection() {
    if (window.getSelection) return window.getSelection().toString();else if (document.getSelection) return document.getSelection().toString();else if (document['selection']) return document['selection'].createRange().text;
    return null;
  },
  calculateScrollbarWidth: function calculateScrollbarWidth() {
    if (this.calculatedScrollbarWidth != null) return this.calculatedScrollbarWidth;
    var scrollDiv = document.createElement('div');
    this.addStyles(scrollDiv, {
      width: '100px',
      height: '100px',
      overflow: 'scroll',
      position: 'absolute',
      top: '-9999px'
    });
    document.body.appendChild(scrollDiv);
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    this.calculatedScrollbarWidth = scrollbarWidth;
    return scrollbarWidth;
  },
  calculateBodyScrollbarWidth: function calculateBodyScrollbarWidth() {
    return window.innerWidth - document.documentElement.offsetWidth;
  },
  getBrowser: function getBrowser() {
    if (!this.browser) {
      var matched = this.resolveUserAgent();
      this.browser = {};
      if (matched.browser) {
        this.browser[matched.browser] = true;
        this.browser['version'] = matched.version;
      }
      if (this.browser['chrome']) {
        this.browser['webkit'] = true;
      } else if (this.browser['webkit']) {
        this.browser['safari'] = true;
      }
    }
    return this.browser;
  },
  resolveUserAgent: function resolveUserAgent() {
    var ua = navigator.userAgent.toLowerCase();
    var match = /(chrome)[ ]([\w.]+)/.exec(ua) || /(webkit)[ ]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ ]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
    return {
      browser: match[1] || '',
      version: match[2] || '0'
    };
  },
  isVisible: function isVisible(element) {
    return element && element.offsetParent != null;
  },
  invokeElementMethod: function invokeElementMethod(element, methodName, args) {
    element[methodName].apply(element, args);
  },
  isExist: function isExist(element) {
    return !!(element !== null && typeof element !== 'undefined' && element.nodeName && this.getParentNode(element));
  },
  isClient: function isClient() {
    return !!("undefined" !== 'undefined'  );
  },
  focus: function focus(el, options) {
    el && document.activeElement !== el && el.focus(options);
  },
  isFocusableElement: function isFocusableElement(element) {
    var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    return this.isElement(element) ? element.matches("button:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])".concat(selector, ",\n                [href][clientHeight][clientWidth]:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])").concat(selector, ",\n                input:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])").concat(selector, ",\n                select:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])").concat(selector, ",\n                textarea:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])").concat(selector, ",\n                [tabIndex]:not([tabIndex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])").concat(selector, ",\n                [contenteditable]:not([tabIndex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])").concat(selector)) : false;
  },
  getFocusableElements: function getFocusableElements(element) {
    var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var focusableElements = this.find(element, "button:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])".concat(selector, ",\n                [href][clientHeight][clientWidth]:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])").concat(selector, ",\n                input:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])").concat(selector, ",\n                select:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])").concat(selector, ",\n                textarea:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])").concat(selector, ",\n                [tabIndex]:not([tabIndex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])").concat(selector, ",\n                [contenteditable]:not([tabIndex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])").concat(selector));
    var visibleFocusableElements = [];
    var _iterator3 = _createForOfIteratorHelper$1(focusableElements),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var focusableElement = _step3.value;
        if (getComputedStyle(focusableElement).display != 'none' && getComputedStyle(focusableElement).visibility != 'hidden') visibleFocusableElements.push(focusableElement);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    return visibleFocusableElements;
  },
  getFirstFocusableElement: function getFirstFocusableElement(element, selector) {
    var focusableElements = this.getFocusableElements(element, selector);
    return focusableElements.length > 0 ? focusableElements[0] : null;
  },
  getLastFocusableElement: function getLastFocusableElement(element, selector) {
    var focusableElements = this.getFocusableElements(element, selector);
    return focusableElements.length > 0 ? focusableElements[focusableElements.length - 1] : null;
  },
  getNextFocusableElement: function getNextFocusableElement(container, element, selector) {
    var focusableElements = this.getFocusableElements(container, selector);
    var index = focusableElements.length > 0 ? focusableElements.findIndex(function (el) {
      return el === element;
    }) : -1;
    var nextIndex = index > -1 && focusableElements.length >= index + 1 ? index + 1 : -1;
    return nextIndex > -1 ? focusableElements[nextIndex] : null;
  },
  getPreviousElementSibling: function getPreviousElementSibling(element, selector) {
    var previousElement = element.previousElementSibling;
    while (previousElement) {
      if (previousElement.matches(selector)) {
        return previousElement;
      } else {
        previousElement = previousElement.previousElementSibling;
      }
    }
    return null;
  },
  getNextElementSibling: function getNextElementSibling(element, selector) {
    var nextElement = element.nextElementSibling;
    while (nextElement) {
      if (nextElement.matches(selector)) {
        return nextElement;
      } else {
        nextElement = nextElement.nextElementSibling;
      }
    }
    return null;
  },
  isClickable: function isClickable(element) {
    if (element) {
      var targetNode = element.nodeName;
      var parentNode = element.parentElement && element.parentElement.nodeName;
      return targetNode === 'INPUT' || targetNode === 'TEXTAREA' || targetNode === 'BUTTON' || targetNode === 'A' || parentNode === 'INPUT' || parentNode === 'TEXTAREA' || parentNode === 'BUTTON' || parentNode === 'A' || !!element.closest('.p-button, .p-checkbox, .p-radiobutton') // @todo Add [data-pc-section="button"]
      ;
    }
    return false;
  },
  applyStyle: function applyStyle(element, style) {
    if (typeof style === 'string') {
      element.style.cssText = style;
    } else {
      for (var prop in style) {
        element.style[prop] = style[prop];
      }
    }
  },
  isIOS: function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window['MSStream'];
  },
  isAndroid: function isAndroid() {
    return /(android)/i.test(navigator.userAgent);
  },
  isTouchDevice: function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  },
  hasCSSAnimation: function hasCSSAnimation(element) {
    if (element) {
      var style = getComputedStyle(element);
      var animationDuration = parseFloat(style.getPropertyValue('animation-duration') || '0');
      return animationDuration > 0;
    }
    return false;
  },
  hasCSSTransition: function hasCSSTransition(element) {
    if (element) {
      var style = getComputedStyle(element);
      var transitionDuration = parseFloat(style.getPropertyValue('transition-duration') || '0');
      return transitionDuration > 0;
    }
    return false;
  },
  exportCSV: function exportCSV(csv, filename) {
    var blob = new Blob([csv], {
      type: 'application/csv;charset=utf-8;'
    });
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, filename + '.csv');
    } else {
      var link = document.createElement('a');
      if (link.download !== undefined) {
        link.setAttribute('href', URL.createObjectURL(blob));
        link.setAttribute('download', filename + '.csv');
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        csv = 'data:text/csv;charset=utf-8,' + csv;
        window.open(encodeURI(csv));
      }
    }
  },
  blockBodyScroll: function blockBodyScroll() {
    var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'p-overflow-hidden';
    document.body.style.setProperty('--scrollbar-width', this.calculateBodyScrollbarWidth() + 'px');
    this.addClass(document.body, className);
  },
  unblockBodyScroll: function unblockBodyScroll() {
    var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'p-overflow-hidden';
    document.body.style.removeProperty('--scrollbar-width');
    this.removeClass(document.body, className);
  }
};

function _typeof$2$1(o) { "@babel/helpers - typeof"; return _typeof$2$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$2$1(o); }
function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties$1(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey$1$1(descriptor.key), descriptor); } }
function _createClass$1(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$1(Constructor.prototype, protoProps); if (staticProps) _defineProperties$1(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey$1$1(t) { var i = _toPrimitive$1$1(t, "string"); return "symbol" == _typeof$2$1(i) ? i : String(i); }
function _toPrimitive$1$1(t, r) { if ("object" != _typeof$2$1(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$2$1(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ConnectedOverlayScrollHandler = /*#__PURE__*/function () {
  function ConnectedOverlayScrollHandler(element) {
    var listener = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    _classCallCheck$1(this, ConnectedOverlayScrollHandler);
    this.element = element;
    this.listener = listener;
  }
  _createClass$1(ConnectedOverlayScrollHandler, [{
    key: "bindScrollListener",
    value: function bindScrollListener() {
      this.scrollableParents = DomHandler.getScrollableParents(this.element);
      for (var i = 0; i < this.scrollableParents.length; i++) {
        this.scrollableParents[i].addEventListener('scroll', this.listener);
      }
    }
  }, {
    key: "unbindScrollListener",
    value: function unbindScrollListener() {
      if (this.scrollableParents) {
        for (var i = 0; i < this.scrollableParents.length; i++) {
          this.scrollableParents[i].removeEventListener('scroll', this.listener);
        }
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.unbindScrollListener();
      this.element = null;
      this.listener = null;
      this.scrollableParents = null;
    }
  }]);
  return ConnectedOverlayScrollHandler;
}();

function primebus() {
  var allHandlers = new Map();
  return {
    on: function on(type, handler) {
      var handlers = allHandlers.get(type);
      if (!handlers) handlers = [handler];else handlers.push(handler);
      allHandlers.set(type, handlers);
    },
    off: function off(type, handler) {
      var handlers = allHandlers.get(type);
      if (handlers) {
        handlers.splice(handlers.indexOf(handler) >>> 0, 1);
      }
    },
    emit: function emit(type, evt) {
      var handlers = allHandlers.get(type);
      if (handlers) {
        handlers.slice().map(function (handler) {
          handler(evt);
        });
      }
    }
  };
}

function _slicedToArray$2(arr, i) { return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest$2(); }
function _nonIterableRest$2() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit$2(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles$2(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray$2(arr) { return _arrayWithoutHoles$2(arr) || _iterableToArray$2(arr) || _unsupportedIterableToArray$2(arr) || _nonIterableSpread$2(); }
function _nonIterableSpread$2() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray$2(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$2(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$2(arr); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$2(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }
function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _typeof$1$1(o) { "@babel/helpers - typeof"; return _typeof$1$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$1$1(o); }
var ObjectUtils = {
  equals: function equals(obj1, obj2, field) {
    if (field) return this.resolveFieldData(obj1, field) === this.resolveFieldData(obj2, field);else return this.deepEquals(obj1, obj2);
  },
  deepEquals: function deepEquals(a, b) {
    if (a === b) return true;
    if (a && b && _typeof$1$1(a) == 'object' && _typeof$1$1(b) == 'object') {
      var arrA = Array.isArray(a),
        arrB = Array.isArray(b),
        i,
        length,
        key;
      if (arrA && arrB) {
        length = a.length;
        if (length != b.length) return false;
        for (i = length; i-- !== 0;) if (!this.deepEquals(a[i], b[i])) return false;
        return true;
      }
      if (arrA != arrB) return false;
      var dateA = a instanceof Date,
        dateB = b instanceof Date;
      if (dateA != dateB) return false;
      if (dateA && dateB) return a.getTime() == b.getTime();
      var regexpA = a instanceof RegExp,
        regexpB = b instanceof RegExp;
      if (regexpA != regexpB) return false;
      if (regexpA && regexpB) return a.toString() == b.toString();
      var keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length) return false;
      for (i = length; i-- !== 0;) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
      for (i = length; i-- !== 0;) {
        key = keys[i];
        if (!this.deepEquals(a[key], b[key])) return false;
      }
      return true;
    }
    return a !== a && b !== b;
  },
  resolveFieldData: function resolveFieldData(data, field) {
    if (!data || !field) {
      // short circuit if there is nothing to resolve
      return null;
    }
    try {
      var value = data[field];
      if (this.isNotEmpty(value)) return value;
    } catch (_unused) {
      // Performance optimization: https://github.com/primefaces/primereact/issues/4797
      // do nothing and continue to other methods to resolve field data
    }
    if (Object.keys(data).length) {
      if (this.isFunction(field)) {
        return field(data);
      } else if (field.indexOf('.') === -1) {
        return data[field];
      } else {
        var fields = field.split('.');
        var _value = data;
        for (var i = 0, len = fields.length; i < len; ++i) {
          if (_value == null) {
            return null;
          }
          _value = _value[fields[i]];
        }
        return _value;
      }
    }
    return null;
  },
  getItemValue: function getItemValue(obj) {
    for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }
    return this.isFunction(obj) ? obj.apply(void 0, params) : obj;
  },
  filter: function filter(value, fields, filterValue) {
    var filteredItems = [];
    if (value) {
      var _iterator = _createForOfIteratorHelper(value),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var item = _step.value;
          var _iterator2 = _createForOfIteratorHelper(fields),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var field = _step2.value;
              if (String(this.resolveFieldData(item, field)).toLowerCase().indexOf(filterValue.toLowerCase()) > -1) {
                filteredItems.push(item);
                break;
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    return filteredItems;
  },
  reorderArray: function reorderArray(value, from, to) {
    if (value && from !== to) {
      if (to >= value.length) {
        to %= value.length;
        from %= value.length;
      }
      value.splice(to, 0, value.splice(from, 1)[0]);
    }
  },
  findIndexInList: function findIndexInList(value, list) {
    var index = -1;
    if (list) {
      for (var i = 0; i < list.length; i++) {
        if (list[i] === value) {
          index = i;
          break;
        }
      }
    }
    return index;
  },
  contains: function contains(value, list) {
    if (value != null && list && list.length) {
      var _iterator3 = _createForOfIteratorHelper(list),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var val = _step3.value;
          if (this.equals(value, val)) return true;
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
    return false;
  },
  insertIntoOrderedArray: function insertIntoOrderedArray(item, index, arr, sourceArr) {
    if (arr.length > 0) {
      var injected = false;
      for (var i = 0; i < arr.length; i++) {
        var currentItemIndex = this.findIndexInList(arr[i], sourceArr);
        if (currentItemIndex > index) {
          arr.splice(i, 0, item);
          injected = true;
          break;
        }
      }
      if (!injected) {
        arr.push(item);
      }
    } else {
      arr.push(item);
    }
  },
  removeAccents: function removeAccents(str) {
    if (str && str.search(/[\xC0-\xFF]/g) > -1) {
      str = str.replace(/[\xC0-\xC5]/g, 'A').replace(/[\xC6]/g, 'AE').replace(/[\xC7]/g, 'C').replace(/[\xC8-\xCB]/g, 'E').replace(/[\xCC-\xCF]/g, 'I').replace(/[\xD0]/g, 'D').replace(/[\xD1]/g, 'N').replace(/[\xD2-\xD6\xD8]/g, 'O').replace(/[\xD9-\xDC]/g, 'U').replace(/[\xDD]/g, 'Y').replace(/[\xDE]/g, 'P').replace(/[\xE0-\xE5]/g, 'a').replace(/[\xE6]/g, 'ae').replace(/[\xE7]/g, 'c').replace(/[\xE8-\xEB]/g, 'e').replace(/[\xEC-\xEF]/g, 'i').replace(/[\xF1]/g, 'n').replace(/[\xF2-\xF6\xF8]/g, 'o').replace(/[\xF9-\xFC]/g, 'u').replace(/[\xFE]/g, 'p').replace(/[\xFD\xFF]/g, 'y');
    }
    return str;
  },
  getVNodeProp: function getVNodeProp(vnode, prop) {
    if (vnode) {
      var props = vnode.props;
      if (props) {
        var kebabProp = prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        var propName = Object.prototype.hasOwnProperty.call(props, kebabProp) ? kebabProp : prop;
        return vnode.type["extends"].props[prop].type === Boolean && props[propName] === '' ? true : props[propName];
      }
    }
    return null;
  },
  toFlatCase: function toFlatCase(str) {
    // convert snake, kebab, camel and pascal cases to flat case
    return this.isString(str) ? str.replace(/(-|_)/g, '').toLowerCase() : str;
  },
  toKebabCase: function toKebabCase(str) {
    // convert snake, camel and pascal cases to kebab case
    return this.isString(str) ? str.replace(/(_)/g, '-').replace(/[A-Z]/g, function (c, i) {
      return i === 0 ? c : '-' + c.toLowerCase();
    }).toLowerCase() : str;
  },
  toCapitalCase: function toCapitalCase(str) {
    return this.isString(str, {
      empty: false
    }) ? str[0].toUpperCase() + str.slice(1) : str;
  },
  isEmpty: function isEmpty(value) {
    return value === null || value === undefined || value === '' || Array.isArray(value) && value.length === 0 || !(value instanceof Date) && _typeof$1$1(value) === 'object' && Object.keys(value).length === 0;
  },
  isNotEmpty: function isNotEmpty(value) {
    return !this.isEmpty(value);
  },
  isFunction: function isFunction(value) {
    return !!(value && value.constructor && value.call && value.apply);
  },
  isObject: function isObject(value) {
    var empty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    return value instanceof Object && value.constructor === Object && (empty || Object.keys(value).length !== 0);
  },
  isDate: function isDate(value) {
    return value instanceof Date && value.constructor === Date;
  },
  isArray: function isArray(value) {
    var empty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    return Array.isArray(value) && (empty || value.length !== 0);
  },
  isString: function isString(value) {
    var empty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    return typeof value === 'string' && (empty || value !== '');
  },
  isPrintableCharacter: function isPrintableCharacter() {
    var _char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return this.isNotEmpty(_char) && _char.length === 1 && _char.match(/\S| /);
  },
  /**
   * Firefox-v103 does not currently support the "findLast" method. It is stated that this method will be supported with Firefox-v104.
   * https://caniuse.com/mdn-javascript_builtins_array_findlast
   */
  findLast: function findLast(arr, callback) {
    var item;
    if (this.isNotEmpty(arr)) {
      try {
        item = arr.findLast(callback);
      } catch (_unused2) {
        item = _toConsumableArray$2(arr).reverse().find(callback);
      }
    }
    return item;
  },
  /**
   * Firefox-v103 does not currently support the "findLastIndex" method. It is stated that this method will be supported with Firefox-v104.
   * https://caniuse.com/mdn-javascript_builtins_array_findlastindex
   */
  findLastIndex: function findLastIndex(arr, callback) {
    var index = -1;
    if (this.isNotEmpty(arr)) {
      try {
        index = arr.findLastIndex(callback);
      } catch (_unused3) {
        index = arr.lastIndexOf(_toConsumableArray$2(arr).reverse().find(callback));
      }
    }
    return index;
  },
  sort: function sort(value1, value2) {
    var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var comparator = arguments.length > 3 ? arguments[3] : undefined;
    var nullSortOrder = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
    var result = this.compare(value1, value2, comparator, order);
    var finalSortOrder = order;

    // nullSortOrder == 1 means Excel like sort nulls at bottom
    if (this.isEmpty(value1) || this.isEmpty(value2)) {
      finalSortOrder = nullSortOrder === 1 ? order : nullSortOrder;
    }
    return finalSortOrder * result;
  },
  compare: function compare(value1, value2, comparator) {
    var order = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
    var result = -1;
    var emptyValue1 = this.isEmpty(value1);
    var emptyValue2 = this.isEmpty(value2);
    if (emptyValue1 && emptyValue2) result = 0;else if (emptyValue1) result = order;else if (emptyValue2) result = -order;else if (typeof value1 === 'string' && typeof value2 === 'string') result = comparator(value1, value2);else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
    return result;
  },
  localeComparator: function localeComparator() {
    //performance gain using Int.Collator. It is not recommended to use localeCompare against large arrays.
    return new Intl.Collator(undefined, {
      numeric: true
    }).compare;
  },
  nestedKeys: function nestedKeys() {
    var _this = this;
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var parentKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    return Object.entries(obj).reduce(function (o, _ref) {
      var _ref2 = _slicedToArray$2(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];
      var currentKey = parentKey ? "".concat(parentKey, ".").concat(key) : key;
      _this.isObject(value) ? o = o.concat(_this.nestedKeys(value, currentKey)) : o.push(currentKey);
      return o;
    }, []);
  },
  stringify: function stringify(value) {
    var _this2 = this;
    var indent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    var currentIndent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var currentIndentStr = ' '.repeat(currentIndent);
    var nextIndentStr = ' '.repeat(currentIndent + indent);
    if (this.isArray(value)) {
      return '[' + value.map(function (v) {
        return _this2.stringify(v, indent, currentIndent + indent);
      }).join(', ') + ']';
    } else if (this.isDate(value)) {
      return value.toISOString();
    } else if (this.isFunction(value)) {
      return value.toString();
    } else if (this.isObject(value)) {
      return '{\n' + Object.entries(value).map(function (_ref3) {
        var _ref4 = _slicedToArray$2(_ref3, 2),
          k = _ref4[0],
          v = _ref4[1];
        return "".concat(nextIndentStr).concat(k, ": ").concat(_this2.stringify(v, indent, currentIndent + indent));
      }).join(',\n') + "\n".concat(currentIndentStr) + '}';
    } else {
      return JSON.stringify(value);
    }
  }
};

function _typeof$5(o) { "@babel/helpers - typeof"; return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$5(o); }
function _toConsumableArray$1(arr) { return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread$1(); }
function _nonIterableSpread$1() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
function _iterableToArray$1(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles$1(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$1(arr); }
function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey$5(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty$5(obj, key, value) { key = _toPropertyKey$5(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$5(t) { var i = _toPrimitive$5(t, "string"); return "symbol" == _typeof$5(i) ? i : String(i); }
function _toPrimitive$5(t, r) { if ("object" != _typeof$5(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$5(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = /*#__PURE__*/function () {
  function _default(_ref) {
    var init = _ref.init,
      type = _ref.type;
    _classCallCheck(this, _default);
    _defineProperty$5(this, "helpers", void 0);
    _defineProperty$5(this, "type", void 0);
    this.helpers = new Set(init);
    this.type = type;
  }
  _createClass(_default, [{
    key: "add",
    value: function add(instance) {
      this.helpers.add(instance);
    }
  }, {
    key: "update",
    value: function update() {
      // @todo
    }
  }, {
    key: "delete",
    value: function _delete(instance) {
      this.helpers["delete"](instance);
    }
  }, {
    key: "clear",
    value: function clear() {
      this.helpers.clear();
    }
  }, {
    key: "get",
    value: function get(parentInstance, slots) {
      var children = this._get(parentInstance, slots);
      var computed = children ? this._recursive(_toConsumableArray$1(this.helpers), children) : null;
      return ObjectUtils.isNotEmpty(computed) ? computed : null;
    }
  }, {
    key: "_isMatched",
    value: function _isMatched(instance, key) {
      var _parent$vnode;
      var parent = instance === null || instance === void 0 ? void 0 : instance.parent;
      return (parent === null || parent === void 0 || (_parent$vnode = parent.vnode) === null || _parent$vnode === void 0 ? void 0 : _parent$vnode.key) === key || parent && this._isMatched(parent, key) || false;
    }
  }, {
    key: "_get",
    value: function _get(parentInstance, slots) {
      var _ref2, _ref2$default;
      return ((_ref2 = slots || (parentInstance === null || parentInstance === void 0 ? void 0 : parentInstance.$slots)) === null || _ref2 === void 0 || (_ref2$default = _ref2["default"]) === null || _ref2$default === void 0 ? void 0 : _ref2$default.call(_ref2)) || null;
    }
  }, {
    key: "_recursive",
    value: function _recursive() {
      var _this = this;
      var helpers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var components = [];
      children.forEach(function (child) {
        if (child.children instanceof Array) {
          components = components.concat(_this._recursive(components, child.children));
        } else if (child.type.name === _this.type) {
          components.push(child);
        } else if (ObjectUtils.isNotEmpty(child.key)) {
          components = components.concat(helpers.filter(function (c) {
            return _this._isMatched(c, child.key);
          }).map(function (c) {
            return c.vnode;
          }));
        }
      });
      return components;
    }
  }]);
  return _default;
}();

var lastId = 0;
function UniqueComponentId () {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'pv_id_';
  lastId++;
  return "".concat(prefix).concat(lastId);
}

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$4(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$4(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$4(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$4(arr); }
function _arrayLikeToArray$4(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function handler() {
  var zIndexes = [];
  var generateZIndex = function generateZIndex(key, autoZIndex) {
    var baseZIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 999;
    var lastZIndex = getLastZIndex(key, autoZIndex, baseZIndex);
    var newZIndex = lastZIndex.value + (lastZIndex.key === key ? 0 : baseZIndex) + 1;
    zIndexes.push({
      key: key,
      value: newZIndex
    });
    return newZIndex;
  };
  var revertZIndex = function revertZIndex(zIndex) {
    zIndexes = zIndexes.filter(function (obj) {
      return obj.value !== zIndex;
    });
  };
  var getCurrentZIndex = function getCurrentZIndex(key, autoZIndex) {
    return getLastZIndex(key, autoZIndex).value;
  };
  var getLastZIndex = function getLastZIndex(key, autoZIndex) {
    var baseZIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    return _toConsumableArray(zIndexes).reverse().find(function (obj) {
      return autoZIndex ? true : obj.key === key;
    }) || {
      key: key,
      value: baseZIndex
    };
  };
  var getZIndex = function getZIndex(el) {
    return el ? parseInt(el.style.zIndex, 10) || 0 : 0;
  };
  return {
    get: getZIndex,
    set: function set(key, el, baseZIndex) {
      if (el) {
        el.style.zIndex = String(generateZIndex(key, true, baseZIndex));
      }
    },
    clear: function clear(el) {
      if (el) {
        revertZIndex(getZIndex(el));
        el.style.zIndex = '';
      }
    },
    getCurrent: function getCurrent(key) {
      return getCurrentZIndex(key, true);
    }
  };
}
var ZIndexUtils = handler();

utils_cjs.ConnectedOverlayScrollHandler = ConnectedOverlayScrollHandler;
utils_cjs.DomHandler = DomHandler;
utils_cjs.EventBus = primebus;
utils_cjs.HelperSet = _default;
utils_cjs.ObjectUtils = ObjectUtils;
utils_cjs.UniqueComponentId = UniqueComponentId;
utils_cjs.ZIndexUtils = ZIndexUtils;

const require$$1 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(vue$1);

Object.defineProperty(usestyle_cjs, '__esModule', { value: true });

var utils$1 = utils_cjs;
var vue = require$$1;

function _typeof$4(o) { "@babel/helpers - typeof"; return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$4(o); }
function ownKeys$2(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$2(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$2(Object(t), !0).forEach(function (r) { _defineProperty$4(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$4(obj, key, value) { key = _toPropertyKey$4(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$4(t) { var i = _toPrimitive$4(t, "string"); return "symbol" == _typeof$4(i) ? i : String(i); }
function _toPrimitive$4(t, r) { if ("object" != _typeof$4(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$4(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function tryOnMounted(fn) {
  var sync = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  if (vue.getCurrentInstance()) vue.onMounted(fn);else if (sync) fn();else vue.nextTick(fn);
}
var _id = 0;
function useStyle(css) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var isLoaded = vue.ref(false);
  var cssRef = vue.ref(css);
  var styleRef = vue.ref(null);
  var defaultDocument = utils$1.DomHandler.isClient() ? window.document : undefined;
  var _options$document = options.document,
    document = _options$document === void 0 ? defaultDocument : _options$document,
    _options$immediate = options.immediate,
    immediate = _options$immediate === void 0 ? true : _options$immediate,
    _options$manual = options.manual,
    manual = _options$manual === void 0 ? false : _options$manual,
    _options$name = options.name,
    name = _options$name === void 0 ? "style_".concat(++_id) : _options$name,
    _options$id = options.id,
    id = _options$id === void 0 ? undefined : _options$id,
    _options$media = options.media,
    media = _options$media === void 0 ? undefined : _options$media,
    _options$nonce = options.nonce,
    nonce = _options$nonce === void 0 ? undefined : _options$nonce,
    _options$props = options.props,
    props = _options$props === void 0 ? {} : _options$props;
  var stop = function stop() {};

  /* @todo: Improve _options params */
  var load = function load(_css) {
    var _props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!document) return;
    var _styleProps = _objectSpread$2(_objectSpread$2({}, props), _props);
    var _name = _styleProps.name || name,
      _id = _styleProps.id || id,
      _nonce = _styleProps.nonce || nonce;
    styleRef.value = document.querySelector("style[data-primevue-style-id=\"".concat(_name, "\"]")) || document.getElementById(_id) || document.createElement('style');
    if (!styleRef.value.isConnected) {
      cssRef.value = _css || css;
      utils$1.DomHandler.setAttributes(styleRef.value, {
        type: 'text/css',
        id: _id,
        media: media,
        nonce: _nonce
      });
      document.head.appendChild(styleRef.value);
      utils$1.DomHandler.setAttribute(styleRef.value, 'data-primevue-style-id', name);
      utils$1.DomHandler.setAttributes(styleRef.value, _styleProps);
    }
    if (isLoaded.value) return;
    stop = vue.watch(cssRef, function (value) {
      styleRef.value.textContent = value;
    }, {
      immediate: true
    });
    isLoaded.value = true;
  };
  var unload = function unload() {
    if (!document || !isLoaded.value) return;
    stop();
    utils$1.DomHandler.isExist(styleRef.value) && document.head.removeChild(styleRef.value);
    isLoaded.value = false;
  };
  if (immediate && !manual) tryOnMounted(load);

  /*if (!manual)
    tryOnScopeDispose(unload)*/

  return {
    id: id,
    name: name,
    css: cssRef,
    unload: unload,
    load: load,
    isLoaded: vue.readonly(isLoaded)
  };
}

usestyle_cjs.useStyle = useStyle;

var usestyle$1 = usestyle_cjs;

function _typeof$3(o) { "@babel/helpers - typeof"; return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$3(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty$3(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$3(obj, key, value) { key = _toPropertyKey$3(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$3(t) { var i = _toPrimitive$3(t, "string"); return "symbol" == _typeof$3(i) ? i : String(i); }
function _toPrimitive$3(t, r) { if ("object" != _typeof$3(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$3(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var css = "\n.p-hidden-accessible {\n    border: 0;\n    clip: rect(0 0 0 0);\n    height: 1px;\n    margin: -1px;\n    overflow: hidden;\n    padding: 0;\n    position: absolute;\n    width: 1px;\n}\n\n.p-hidden-accessible input,\n.p-hidden-accessible select {\n    transform: scale(0);\n}\n\n.p-overflow-hidden {\n    overflow: hidden;\n    padding-right: var(--scrollbar-width);\n}\n";
var classes$b = {};
var inlineStyles$4 = {};
var BaseStyle$c = {
  name: 'base',
  css: css,
  classes: classes$b,
  inlineStyles: inlineStyles$4,
  loadStyle: function loadStyle() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return this.css ? usestyle$1.useStyle(this.css, _objectSpread$1({
      name: this.name
    }, options)) : {};
  },
  getStyleSheet: function getStyleSheet() {
    var extendedCSS = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (this.css) {
      var _props = Object.entries(props).reduce(function (acc, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          k = _ref2[0],
          v = _ref2[1];
        return acc.push("".concat(k, "=\"").concat(v, "\"")) && acc;
      }, []).join(' ');
      return "<style type=\"text/css\" data-primevue-style-id=\"".concat(this.name, "\" ").concat(_props, ">").concat(this.css).concat(extendedCSS, "</style>");
    }
    return '';
  },
  extend: function extend(style) {
    return _objectSpread$1(_objectSpread$1({}, this), {}, {
      css: undefined
    }, style);
  }
};

var basestyle_cjs = BaseStyle$c;

const BaseStyle$d = /*@__PURE__*/getDefaultExportFromCjs(basestyle_cjs);

var BaseStyle$b = basestyle_cjs;
var usestyle = usestyle_cjs;

function _interopDefaultLegacy$b (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default$b = /*#__PURE__*/_interopDefaultLegacy$b(BaseStyle$b);

function _typeof$2(o) { "@babel/helpers - typeof"; return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$2(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty$2(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty$2(obj, key, value) { key = _toPropertyKey$2(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$2(t) { var i = _toPrimitive$2(t, "string"); return "symbol" == _typeof$2(i) ? i : String(i); }
function _toPrimitive$2(t, r) { if ("object" != _typeof$2(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$2(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var BaseComponentStyle = BaseStyle__default$b["default"].extend({
  name: 'common',
  loadGlobalStyle: function loadGlobalStyle(globalCSS) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return usestyle.useStyle(globalCSS, _objectSpread({
      name: 'global'
    }, options));
  }
});

var basecomponentstyle_cjs = BaseComponentStyle;

const BaseComponentStyle$1 = /*@__PURE__*/getDefaultExportFromCjs(basecomponentstyle_cjs);

var BaseStyle$a = basestyle_cjs;
var utils = utils_cjs;

function _interopDefaultLegacy$a (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default$a = /*#__PURE__*/_interopDefaultLegacy$a(BaseStyle$a);

var inlineStyles$3 = {
  root: {
    position: 'relative'
  }
};
var classes$a = {
  root: function root(_ref) {
    var instance = _ref.instance,
      props = _ref.props;
    return ['p-autocomplete p-component p-inputwrapper', {
      'p-disabled': props.disabled,
      'p-invalid': props.invalid,
      'p-focus': instance.focused,
      'p-autocomplete-dd': props.dropdown,
      'p-autocomplete-multiple': props.multiple,
      'p-inputwrapper-filled': props.modelValue || utils.ObjectUtils.isNotEmpty(instance.inputValue),
      'p-inputwrapper-focus': instance.focused,
      'p-overlay-open': instance.overlayVisible
    }];
  },
  input: function input(_ref2) {
    var props = _ref2.props,
      instance = _ref2.instance;
    return ['p-autocomplete-input p-inputtext p-component', {
      'p-autocomplete-dd-input': props.dropdown,
      'p-variant-filled': props.variant ? props.variant === 'filled' : instance.$primevue.config.inputStyle === 'filled'
    }];
  },
  container: function container(_ref3) {
    var props = _ref3.props,
      instance = _ref3.instance;
    return ['p-autocomplete-multiple-container p-component p-inputtext', {
      'p-variant-filled': props.variant ? props.variant === 'filled' : instance.$primevue.config.inputStyle === 'filled'
    }];
  },
  token: function token(_ref4) {
    var instance = _ref4.instance,
      i = _ref4.i;
    return ['p-autocomplete-token', {
      'p-focus': instance.focusedMultipleOptionIndex === i
    }];
  },
  tokenLabel: 'p-autocomplete-token-label',
  removeTokenIcon: 'p-autocomplete-token-icon',
  inputToken: 'p-autocomplete-input-token',
  loadingIcon: 'p-autocomplete-loader',
  dropdownButton: 'p-autocomplete-dropdown',
  panel: function panel(_ref5) {
    _ref5.props;
      var instance = _ref5.instance;
    return ['p-autocomplete-panel p-component', {
      'p-ripple-disabled': instance.$primevue.config.ripple === false
    }];
  },
  list: 'p-autocomplete-items',
  itemGroup: 'p-autocomplete-item-group',
  item: function item(_ref6) {
    var instance = _ref6.instance,
      option = _ref6.option,
      i = _ref6.i,
      getItemOptions = _ref6.getItemOptions;
    return ['p-autocomplete-item', {
      'p-highlight': instance.isSelected(option),
      'p-focus': instance.focusedOptionIndex === instance.getOptionIndex(i, getItemOptions),
      'p-disabled': instance.isOptionDisabled(option)
    }];
  },
  emptyMessage: 'p-autocomplete-empty-message'
};
var AutoCompleteStyle = BaseStyle__default$a["default"].extend({
  name: 'autocomplete',
  classes: classes$a,
  inlineStyles: inlineStyles$3
});

var autocompletestyle_cjs = AutoCompleteStyle;

const AutoCompleteStyle$1 = /*@__PURE__*/getDefaultExportFromCjs(autocompletestyle_cjs);

var BaseStyle$9 = basestyle_cjs;

function _interopDefaultLegacy$9 (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default$9 = /*#__PURE__*/_interopDefaultLegacy$9(BaseStyle$9);

var classes$9 = {
  root: function root(_ref) {
    var instance = _ref.instance,
      props = _ref.props;
    return ['p-inputnumber p-component p-inputwrapper', {
      'p-inputwrapper-filled': instance.filled || props.allowEmpty === false,
      'p-inputwrapper-focus': instance.focused,
      'p-inputnumber-buttons-stacked': props.showButtons && props.buttonLayout === 'stacked',
      'p-inputnumber-buttons-horizontal': props.showButtons && props.buttonLayout === 'horizontal',
      'p-inputnumber-buttons-vertical': props.showButtons && props.buttonLayout === 'vertical',
      'p-invalid': props.invalid
    }];
  },
  input: function input(_ref2) {
    var props = _ref2.props,
      instance = _ref2.instance;
    return ['p-inputnumber-input', {
      'p-variant-filled': props.variant ? props.variant === 'filled' : instance.$primevue.config.inputStyle === 'filled'
    }];
  },
  buttonGroup: 'p-inputnumber-button-group',
  incrementButton: function incrementButton(_ref3) {
    var instance = _ref3.instance,
      props = _ref3.props;
    return ['p-inputnumber-button p-inputnumber-button-up', {
      'p-disabled': props.showButtons && props.max !== null && instance.maxBoundry()
    }];
  },
  decrementButton: function decrementButton(_ref4) {
    var instance = _ref4.instance,
      props = _ref4.props;
    return ['p-inputnumber-button p-inputnumber-button-down', {
      'p-disabled': props.showButtons && props.min !== null && instance.minBoundry()
    }];
  }
};
var InputNumberStyle = BaseStyle__default$9["default"].extend({
  name: 'inputnumber',
  classes: classes$9
});

var inputnumberstyle_cjs = InputNumberStyle;

const InputNumberStyle$1 = /*@__PURE__*/getDefaultExportFromCjs(inputnumberstyle_cjs);

var BaseStyle$8 = basestyle_cjs;

function _interopDefaultLegacy$8 (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default$8 = /*#__PURE__*/_interopDefaultLegacy$8(BaseStyle$8);

function _typeof$1(o) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$1(o); }
function _defineProperty$1(obj, key, value) { key = _toPropertyKey$1(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$1(t) { var i = _toPrimitive$1(t, "string"); return "symbol" == _typeof$1(i) ? i : String(i); }
function _toPrimitive$1(t, r) { if ("object" != _typeof$1(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$1(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var classes$8 = {
  root: function root(_ref) {
    var instance = _ref.instance,
      props = _ref.props;
    return ['p-button p-component', _defineProperty$1(_defineProperty$1(_defineProperty$1(_defineProperty$1(_defineProperty$1(_defineProperty$1(_defineProperty$1(_defineProperty$1({
      'p-button-icon-only': instance.hasIcon && !props.label && !props.badge,
      'p-button-vertical': (props.iconPos === 'top' || props.iconPos === 'bottom') && props.label,
      'p-disabled': instance.$attrs.disabled || instance.$attrs.disabled === '' || props.loading,
      'p-button-loading': props.loading,
      'p-button-loading-label-only': props.loading && !instance.hasIcon && props.label,
      'p-button-link': props.link
    }, "p-button-".concat(props.severity), props.severity), 'p-button-raised', props.raised), 'p-button-rounded', props.rounded), 'p-button-text', props.text), 'p-button-outlined', props.outlined), 'p-button-sm', props.size === 'small'), 'p-button-lg', props.size === 'large'), 'p-button-plain', props.plain)];
  },
  loadingIcon: 'p-button-loading-icon pi-spin',
  icon: function icon(_ref3) {
    var props = _ref3.props;
    return ['p-button-icon', {
      'p-button-icon-left': props.iconPos === 'left' && props.label,
      'p-button-icon-right': props.iconPos === 'right' && props.label,
      'p-button-icon-top': props.iconPos === 'top' && props.label,
      'p-button-icon-bottom': props.iconPos === 'bottom' && props.label
    }];
  },
  label: 'p-button-label'
};
var ButtonStyle = BaseStyle__default$8["default"].extend({
  name: 'button',
  classes: classes$8
});

var buttonstyle_cjs = ButtonStyle;

const ButtonStyle$1 = /*@__PURE__*/getDefaultExportFromCjs(buttonstyle_cjs);

var ColumnStyle = {};

var columnstyle_cjs = ColumnStyle;

const ColumnStyle$1 = /*@__PURE__*/getDefaultExportFromCjs(columnstyle_cjs);

var BaseStyle$7 = basestyle_cjs;

function _interopDefaultLegacy$7 (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default$7 = /*#__PURE__*/_interopDefaultLegacy$7(BaseStyle$7);

var classes$7 = {
  root: function root(_ref) {
    var instance = _ref.instance,
      props = _ref.props;
    return ['p-datatable p-component', {
      'p-datatable-hoverable-rows': props.rowHover || props.selectionMode,
      'p-datatable-resizable': props.resizableColumns,
      'p-datatable-resizable-fit': props.resizableColumns && props.columnResizeMode === 'fit',
      'p-datatable-scrollable': props.scrollable,
      'p-datatable-flex-scrollable': props.scrollable && props.scrollHeight === 'flex',
      'p-datatable-responsive-stack': props.responsiveLayout === 'stack',
      'p-datatable-responsive-scroll': props.responsiveLayout === 'scroll',
      'p-datatable-striped': props.stripedRows,
      'p-datatable-gridlines': props.showGridlines,
      'p-datatable-grouped-header': instance.headerColumnGroup != null,
      'p-datatable-grouped-footer': instance.footerColumnGroup != null,
      'p-datatable-sm': props.size === 'small',
      'p-datatable-lg': props.size === 'large'
    }];
  },
  loadingOverlay: 'p-datatable-loading-overlay p-component-overlay',
  loadingIcon: 'p-datatable-loading-icon',
  header: 'p-datatable-header',
  paginator: function paginator(_ref2) {
    var instance = _ref2.instance;
    return instance.paginatorTop ? 'p-paginator-top' : instance.paginatorBottom ? 'p-paginator-bottom' : '';
  },
  wrapper: 'p-datatable-wrapper',
  table: function table(_ref3) {
    var props = _ref3.props;
    return ['p-datatable-table', {
      'p-datatable-scrollable-table': props.scrollable,
      'p-datatable-resizable-table': props.resizableColumns,
      'p-datatable-resizable-table-fit': props.resizableColumns && props.columnResizeMode === 'fit'
    }];
  },
  //tablehead
  thead: 'p-datatable-thead',
  // headercell
  headerCell: function headerCell(_ref4) {
    var instance = _ref4.instance,
      props = _ref4.props,
      column = _ref4.column;
    return column && !instance.columnProp(column, 'hidden') && (props.rowGroupMode !== 'subheader' || props.groupRowsBy !== instance.columnProp(column, 'field')) ? ['p-filter-column', {
      'p-frozen-column': instance.columnProp(column, 'frozen')
    }] : [{
      'p-sortable-column': instance.columnProp('sortable'),
      'p-resizable-column': instance.resizableColumns,
      'p-highlight': instance.isColumnSorted(),
      'p-filter-column': props.filterColumn,
      'p-frozen-column': instance.columnProp('frozen'),
      'p-reorderable-column': props.reorderableColumns
    }];
  },
  columnResizer: 'p-column-resizer',
  headerContent: 'p-column-header-content',
  headerTitle: 'p-column-title',
  sortIcon: 'p-sortable-column-icon',
  sortBadge: 'p-sortable-column-badge',
  // columnfilter
  columnFilter: function columnFilter(_ref5) {
    var props = _ref5.props;
    return ['p-column-filter p-fluid', {
      'p-column-filter-row': props.display === 'row',
      'p-column-filter-menu': props.display === 'menu'
    }];
  },
  filterInput: 'p-fluid p-column-filter-element',
  filterMenuButton: function filterMenuButton(_ref6) {
    var instance = _ref6.instance;
    return ['p-column-filter-menu-button p-link', {
      'p-column-filter-menu-button-open': instance.overlayVisible,
      'p-column-filter-menu-button-active': instance.hasFilter()
    }];
  },
  headerFilterClearButton: function headerFilterClearButton(_ref7) {
    var instance = _ref7.instance;
    return ['p-column-filter-clear-button p-link', {
      'p-hidden-space': !instance.hasRowFilter()
    }];
  },
  filterOverlay: function filterOverlay(_ref8) {
    var instance = _ref8.instance,
      props = _ref8.props;
    return [{
      'p-column-filter-overlay p-component p-fluid': true,
      'p-column-filter-overlay-menu': props.display === 'menu',
      'p-ripple-disabled': instance.$primevue.config.ripple === false
    }];
  },
  filterRowItems: 'p-column-filter-row-items',
  filterRowItem: function filterRowItem(_ref9) {
    var instance = _ref9.instance,
      matchMode = _ref9.matchMode;
    return ['p-column-filter-row-item', {
      'p-highlight': matchMode && instance.isRowMatchModeSelected(matchMode.value)
    }];
  },
  filterSeparator: 'p-column-filter-separator',
  filterOperator: 'p-column-filter-operator',
  filterOperatorDropdown: 'p-column-filter-operator-dropdown',
  filterConstraints: 'p-column-filter-constraints',
  filterConstraint: 'p-column-filter-constraint',
  filterMatchModeDropdown: 'p-column-filter-matchmode-dropdown',
  filterRemoveButton: 'p-column-filter-remove-button p-button-text p-button-danger p-button-sm',
  filterAddRule: 'p-column-filter-add-rule',
  filterAddRuleButton: 'p-column-filter-add-button p-button-text p-button-sm',
  filterButtonbar: 'p-column-filter-buttonbar',
  filterClearButton: 'p-button-outlined p-button-sm',
  filterApplyButton: 'p-button-sm',
  //tablebody
  tbody: function tbody(_ref10) {
    var props = _ref10.props;
    return props.frozenRow ? 'p-datatable-tbody p-datatable-frozen-tbody' : 'p-datatable-tbody';
  },
  rowgroupHeader: 'p-rowgroup-header',
  rowGroupToggler: 'p-row-toggler p-link',
  rowGroupTogglerIcon: 'p-row-toggler-icon',
  row: function row(_ref11) {
    var instance = _ref11.instance,
      props = _ref11.props,
      index = _ref11.index,
      columnSelectionMode = _ref11.columnSelectionMode;
    var rowStyleClass = [];
    if (props.selectionMode) {
      rowStyleClass.push('p-selectable-row');
    }
    if (props.selection) {
      rowStyleClass.push({
        'p-highlight': columnSelectionMode ? instance.isSelected && instance.$parentInstance.$parentInstance.highlightOnSelect : instance.isSelected
      });
    }
    if (props.contextMenuSelection) {
      rowStyleClass.push({
        'p-highlight-contextmenu': instance.isSelectedWithContextMenu
      });
    }
    rowStyleClass.push(index % 2 === 0 ? 'p-row-even' : 'p-row-odd');
    return rowStyleClass;
  },
  rowExpansion: 'p-datatable-row-expansion',
  rowgroupFooter: 'p-rowgroup-footer',
  emptyMessage: 'p-datatable-emptymessage',
  //bodycell
  bodyCell: function bodyCell(_ref12) {
    var instance = _ref12.instance;
    return [{
      'p-selection-column': instance.columnProp('selectionMode') != null,
      'p-editable-column': instance.isEditable(),
      'p-cell-editing': instance.d_editing,
      'p-frozen-column': instance.columnProp('frozen')
    }];
  },
  columnTitle: 'p-column-title',
  rowReorderIcon: 'p-datatable-reorderablerow-handle',
  rowToggler: 'p-row-toggler p-link',
  rowTogglerIcon: 'p-row-toggler-icon',
  rowEditorInitButton: 'p-row-editor-init p-link',
  rowEditorInitIcon: 'p-row-editor-init-icon',
  rowEditorSaveButton: 'p-row-editor-save p-link',
  rowEditorSaveIcon: 'p-row-editor-save-icon',
  rowEditorCancelButton: 'p-row-editor-cancel p-link',
  rowEditorCancelIcon: 'p-row-editor-cancel-icon',
  //tablefooter
  tfoot: 'p-datatable-tfoot',
  //footercell
  footerCell: function footerCell(_ref13) {
    var instance = _ref13.instance;
    return [{
      'p-frozen-column': instance.columnProp('frozen')
    }];
  },
  //datatable
  virtualScrollerSpacer: 'p-datatable-virtualscroller-spacer',
  footer: 'p-datatable-footer',
  resizeHelper: 'p-column-resizer-helper',
  reorderIndicatorUp: 'p-datatable-reorder-indicator-up',
  reorderIndicatorDown: 'p-datatable-reorder-indicator-down'
};
var inlineStyles$2 = {
  wrapper: {
    overflow: 'auto'
  },
  thead: {
    position: 'sticky'
  },
  tfoot: {
    position: 'sticky'
  }
};
var DataTableStyle = BaseStyle__default$7["default"].extend({
  name: 'datatable',
  classes: classes$7,
  inlineStyles: inlineStyles$2
});

var datatablestyle_cjs = DataTableStyle;

const DataTableStyle$1 = /*@__PURE__*/getDefaultExportFromCjs(datatablestyle_cjs);

var BaseStyle$6 = basestyle_cjs;

function _interopDefaultLegacy$6 (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default$6 = /*#__PURE__*/_interopDefaultLegacy$6(BaseStyle$6);

var classes$6 = {
  root: 'p-accordion p-component',
  tab: {
    root: function root(_ref) {
      var instance = _ref.instance,
        index = _ref.index;
      return ['p-accordion-tab', {
        'p-accordion-tab-active': instance.isTabActive(index)
      }];
    },
    header: function header(_ref2) {
      var instance = _ref2.instance,
        tab = _ref2.tab,
        index = _ref2.index;
      return ['p-accordion-header', {
        'p-highlight': instance.isTabActive(index),
        'p-disabled': instance.getTabProp(tab, 'disabled')
      }];
    },
    headerAction: 'p-accordion-header-link p-accordion-header-action',
    headerIcon: 'p-accordion-toggle-icon',
    headerTitle: 'p-accordion-header-text',
    toggleableContent: 'p-toggleable-content',
    content: 'p-accordion-content'
  }
};
var AccordionStyle = BaseStyle__default$6["default"].extend({
  name: 'accordion',
  classes: classes$6
});

var accordionstyle_cjs = AccordionStyle;

const AccordionStyle$1 = /*@__PURE__*/getDefaultExportFromCjs(accordionstyle_cjs);

var AccordionTabStyle = {};

var accordiontabstyle_cjs = AccordionTabStyle;

const AccordionTabStyle$1 = /*@__PURE__*/getDefaultExportFromCjs(accordiontabstyle_cjs);

var BaseStyle$5 = basestyle_cjs;

function _interopDefaultLegacy$5 (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default$5 = /*#__PURE__*/_interopDefaultLegacy$5(BaseStyle$5);

var classes$5 = {
  root: function root(_ref) {
    var props = _ref.props;
    return ['p-tabview p-component', {
      'p-tabview-scrollable': props.scrollable
    }];
  },
  navContainer: 'p-tabview-nav-container',
  previousButton: 'p-tabview-nav-prev p-tabview-nav-btn p-link',
  navContent: 'p-tabview-nav-content',
  nav: 'p-tabview-nav',
  tab: {
    header: function header(_ref2) {
      var instance = _ref2.instance,
        tab = _ref2.tab,
        index = _ref2.index;
      return ['p-tabview-header', instance.getTabProp(tab, 'headerClass'), {
        'p-highlight': instance.d_activeIndex === index,
        'p-disabled': instance.getTabProp(tab, 'disabled')
      }];
    },
    headerAction: 'p-tabview-nav-link p-tabview-header-action',
    headerTitle: 'p-tabview-title',
    content: function content(_ref3) {
      var instance = _ref3.instance,
        tab = _ref3.tab;
      return ['p-tabview-panel', instance.getTabProp(tab, 'contentClass')];
    }
  },
  inkbar: 'p-tabview-ink-bar',
  nextButton: 'p-tabview-nav-next p-tabview-nav-btn p-link',
  panelContainer: 'p-tabview-panels'
};
var TabViewStyle = BaseStyle__default$5["default"].extend({
  name: 'tabview',
  classes: classes$5
});

var tabviewstyle_cjs = TabViewStyle;

const TabViewStyle$1 = /*@__PURE__*/getDefaultExportFromCjs(tabviewstyle_cjs);

var TabPanelStyle = {};

var tabpanelstyle_cjs = TabPanelStyle;

const TabPanelStyle$1 = /*@__PURE__*/getDefaultExportFromCjs(tabpanelstyle_cjs);

var BaseStyle$4 = basestyle_cjs;

function _interopDefaultLegacy$4 (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default$4 = /*#__PURE__*/_interopDefaultLegacy$4(BaseStyle$4);

/* Position */
var inlineStyles$1 = {
  mask: function mask(_ref) {
    var position = _ref.position,
      modal = _ref.modal;
    return {
      position: 'fixed',
      height: '100%',
      width: '100%',
      left: 0,
      top: 0,
      display: 'flex',
      justifyContent: position === 'left' || position === 'topleft' || position === 'bottomleft' ? 'flex-start' : position === 'right' || position === 'topright' || position === 'bottomright' ? 'flex-end' : 'center',
      alignItems: position === 'top' || position === 'topleft' || position === 'topright' ? 'flex-start' : position === 'bottom' || position === 'bottomleft' || position === 'bottomright' ? 'flex-end' : 'center',
      pointerEvents: modal ? 'auto' : 'none'
    };
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    pointerEvents: 'auto'
  }
};
var classes$4 = {
  mask: function mask(_ref2) {
    var props = _ref2.props;
    var positions = ['left', 'right', 'top', 'topleft', 'topright', 'bottom', 'bottomleft', 'bottomright'];
    var pos = positions.find(function (item) {
      return item === props.position;
    });
    return ['p-dialog-mask', {
      'p-component-overlay p-component-overlay-enter': props.modal
    }, pos ? "p-dialog-".concat(pos) : ''];
  },
  root: function root(_ref3) {
    var props = _ref3.props,
      instance = _ref3.instance;
    return ['p-dialog p-component', {
      'p-dialog-rtl': props.rtl,
      'p-dialog-maximized': props.maximizable && instance.maximized,
      'p-ripple-disabled': instance.$primevue.config.ripple === false
    }];
  },
  header: 'p-dialog-header',
  title: 'p-dialog-title',
  icons: 'p-dialog-header-icons',
  maximizableButton: 'p-dialog-header-icon p-dialog-header-maximize p-link',
  maximizableIcon: 'p-dialog-header-maximize-icon',
  closeButton: 'p-dialog-header-icon p-dialog-header-close p-link',
  closeButtonIcon: 'p-dialog-header-close-icon',
  content: 'p-dialog-content',
  footer: 'p-dialog-footer'
};
var DialogStyle = BaseStyle__default$4["default"].extend({
  name: 'dialog',
  classes: classes$4,
  inlineStyles: inlineStyles$1
});

var dialogstyle_cjs = DialogStyle;

const DialogStyle$1 = /*@__PURE__*/getDefaultExportFromCjs(dialogstyle_cjs);

var BaseStyle$3 = basestyle_cjs;

function _interopDefaultLegacy$3 (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default$3 = /*#__PURE__*/_interopDefaultLegacy$3(BaseStyle$3);

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

// Position
var inlineStyles = {
  root: function root(_ref) {
    var position = _ref.position;
    return {
      position: 'fixed',
      top: position === 'top-right' || position === 'top-left' || position === 'top-center' ? '20px' : position === 'center' ? '50%' : null,
      right: (position === 'top-right' || position === 'bottom-right') && '20px',
      bottom: (position === 'bottom-left' || position === 'bottom-right' || position === 'bottom-center') && '20px',
      left: position === 'top-left' || position === 'bottom-left' ? '20px' : position === 'center' || position === 'top-center' || position === 'bottom-center' ? '50%' : null
    };
  }
};
var classes$3 = {
  root: function root(_ref2) {
    var props = _ref2.props,
      instance = _ref2.instance;
    return ['p-toast p-component p-toast-' + props.position, {
      'p-ripple-disabled': instance.$primevue.config.ripple === false
    }];
  },
  container: function container(_ref3) {
    var props = _ref3.props;
    return ['p-toast-message', {
      'p-toast-message-info': props.message.severity === 'info' || props.message.severity === undefined,
      'p-toast-message-warn': props.message.severity === 'warn',
      'p-toast-message-error': props.message.severity === 'error',
      'p-toast-message-success': props.message.severity === 'success',
      'p-toast-message-secondary': props.message.severity === 'secondary',
      'p-toast-message-contrast': props.message.severity === 'contrast'
    }];
  },
  content: 'p-toast-message-content',
  icon: function icon(_ref4) {
    var props = _ref4.props;
    return ['p-toast-message-icon', _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, props.infoIcon, props.message.severity === 'info'), props.warnIcon, props.message.severity === 'warn'), props.errorIcon, props.message.severity === 'error'), props.successIcon, props.message.severity === 'success')];
  },
  text: 'p-toast-message-text',
  summary: 'p-toast-summary',
  detail: 'p-toast-detail',
  closeButton: 'p-toast-icon-close p-link',
  closeIcon: 'p-toast-icon-close-icon'
};
var ToastStyle = BaseStyle__default$3["default"].extend({
  name: 'toast',
  classes: classes$3,
  inlineStyles: inlineStyles
});

var toaststyle_cjs = ToastStyle;

const ToastStyle$1 = /*@__PURE__*/getDefaultExportFromCjs(toaststyle_cjs);

var BaseStyle$2 = basestyle_cjs;

function _interopDefaultLegacy$2 (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default$2 = /*#__PURE__*/_interopDefaultLegacy$2(BaseStyle$2);

var classes$2 = {
  root: function root(_ref) {
    var instance = _ref.instance;
    return ['p-carousel p-component', {
      'p-carousel-vertical': instance.isVertical(),
      'p-carousel-horizontal': !instance.isVertical()
    }];
  },
  header: 'p-carousel-header',
  content: 'p-carousel-content',
  container: 'p-carousel-container',
  previousButton: function previousButton(_ref2) {
    var instance = _ref2.instance;
    return ['p-carousel-prev p-link', {
      'p-disabled': instance.backwardIsDisabled
    }];
  },
  previousButtonIcon: 'p-carousel-next-icon',
  itemsContent: 'p-carousel-items-content',
  itemsContainer: 'p-carousel-items-container',
  itemCloned: function itemCloned(_ref3) {
    var index = _ref3.index,
      value = _ref3.value,
      totalShiftedItems = _ref3.totalShiftedItems,
      d_numVisible = _ref3.d_numVisible;
    return ['p-carousel-item p-carousel-item-cloned', {
      'p-carousel-item-active': totalShiftedItems * -1 === value.length + d_numVisible,
      'p-carousel-item-start': index === 0,
      'p-carousel-item-end': value.slice(-1 * d_numVisible).length - 1 === index
    }];
  },
  item: function item(_ref4) {
    var instance = _ref4.instance,
      index = _ref4.index;
    return ['p-carousel-item', {
      'p-carousel-item-active': instance.firstIndex() <= index && instance.lastIndex() >= index,
      'p-carousel-item-start': instance.firstIndex() === index,
      'p-carousel-item-end': instance.lastIndex() === index
    }];
  },
  nextButton: function nextButton(_ref5) {
    var instance = _ref5.instance;
    return ['p-carousel-next p-link', {
      'p-disabled': instance.forwardIsDisabled
    }];
  },
  nextButtonIcon: 'p-carousel-prev-icon',
  indicators: 'p-carousel-indicators p-reset',
  indicator: function indicator(_ref6) {
    var instance = _ref6.instance,
      index = _ref6.index;
    return ['p-carousel-indicator', {
      'p-highlight': instance.d_page === index
    }];
  },
  indicatorButton: 'p-link',
  footer: 'p-carousel-footer'
};
var CarouselStyle = BaseStyle__default$2["default"].extend({
  name: 'carousel',
  classes: classes$2
});

var carouselstyle_cjs = CarouselStyle;

const CarouselStyle$1 = /*@__PURE__*/getDefaultExportFromCjs(carouselstyle_cjs);

var BaseStyle$1 = basestyle_cjs;

function _interopDefaultLegacy$1 (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default$1 = /*#__PURE__*/_interopDefaultLegacy$1(BaseStyle$1);

var classes$1 = {
  root: 'p-progress-spinner',
  spinner: 'p-progress-spinner-svg',
  circle: 'p-progress-spinner-circle'
};
var ProgressSpinnerStyle = BaseStyle__default$1["default"].extend({
  name: 'progressspinner',
  classes: classes$1
});

var progressspinnerstyle_cjs = ProgressSpinnerStyle;

const ProgressSpinnerStyle$1 = /*@__PURE__*/getDefaultExportFromCjs(progressspinnerstyle_cjs);

var BaseStyle = basestyle_cjs;

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseStyle);

var classes = {
  root: 'p-tooltip p-component',
  arrow: 'p-tooltip-arrow',
  text: 'p-tooltip-text'
};
var TooltipStyle = BaseStyle__default["default"].extend({
  name: 'tooltip',
  classes: classes
});

var tooltipstyle_cjs = TooltipStyle;

const TooltipStyle$1 = /*@__PURE__*/getDefaultExportFromCjs(tooltipstyle_cjs);

const stylesToTop = ['<style type="text/css" data-primevue-style-id="layer-order" >@layer tailwind-base, primvevue, tailwind-utilities</style>'].join('');
const styleProps = {
  
};
const styles = [
  ,
  BaseStyle$d && BaseStyle$d.getStyleSheet ? BaseStyle$d.getStyleSheet(undefined, styleProps) : '',BaseComponentStyle$1 && BaseComponentStyle$1.getStyleSheet ? BaseComponentStyle$1.getStyleSheet(undefined, styleProps) : '',AutoCompleteStyle$1 && AutoCompleteStyle$1.getStyleSheet ? AutoCompleteStyle$1.getStyleSheet(undefined, styleProps) : '',InputNumberStyle$1 && InputNumberStyle$1.getStyleSheet ? InputNumberStyle$1.getStyleSheet(undefined, styleProps) : '',ButtonStyle$1 && ButtonStyle$1.getStyleSheet ? ButtonStyle$1.getStyleSheet(undefined, styleProps) : '',ColumnStyle$1 && ColumnStyle$1.getStyleSheet ? ColumnStyle$1.getStyleSheet(undefined, styleProps) : '',DataTableStyle$1 && DataTableStyle$1.getStyleSheet ? DataTableStyle$1.getStyleSheet(undefined, styleProps) : '',AccordionStyle$1 && AccordionStyle$1.getStyleSheet ? AccordionStyle$1.getStyleSheet(undefined, styleProps) : '',AccordionTabStyle$1 && AccordionTabStyle$1.getStyleSheet ? AccordionTabStyle$1.getStyleSheet(undefined, styleProps) : '',TabViewStyle$1 && TabViewStyle$1.getStyleSheet ? TabViewStyle$1.getStyleSheet(undefined, styleProps) : '',TabPanelStyle$1 && TabPanelStyle$1.getStyleSheet ? TabPanelStyle$1.getStyleSheet(undefined, styleProps) : '',DialogStyle$1 && DialogStyle$1.getStyleSheet ? DialogStyle$1.getStyleSheet(undefined, styleProps) : '',ToastStyle$1 && ToastStyle$1.getStyleSheet ? ToastStyle$1.getStyleSheet(undefined, styleProps) : '',CarouselStyle$1 && CarouselStyle$1.getStyleSheet ? CarouselStyle$1.getStyleSheet(undefined, styleProps) : '',ProgressSpinnerStyle$1 && ProgressSpinnerStyle$1.getStyleSheet ? ProgressSpinnerStyle$1.getStyleSheet(undefined, styleProps) : '',TooltipStyle$1 && TooltipStyle$1.getStyleSheet ? TooltipStyle$1.getStyleSheet(undefined, styleProps) : ''
].join('');

const defineNitroPlugin = (def) => def;
const _Bqeas0SwaX = defineNitroPlugin(async (nitroApp) => {
  nitroApp.hooks.hook("render:html", (html) => {
    html.head.unshift(stylesToTop);
    html.head.push(styles);
  });
});

const plugins = [
  _Bqeas0SwaX
];

function defineRenderHandler(handler) {
  return eventHandler(async (event) => {
    if (event.path.endsWith("/favicon.ico")) {
      setResponseHeader(event, "Content-Type", "image/x-icon");
      return send(
        event,
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
      );
    }
    const response = await handler(event);
    if (!response) {
      const _currentStatus = getResponseStatus(event);
      setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
      return send(
        event,
        "No response returned from render handler: " + event.path
      );
    }
    const nitroApp = useNitroApp();
    await nitroApp.hooks.callHook("render:response", response, { event });
    if (response.headers) {
      setResponseHeaders(event, response.headers);
    }
    if (response.statusCode || response.statusMessage) {
      setResponseStatus(event, response.statusCode, response.statusMessage);
    }
    return response.body;
  });
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.path,
    statusCode,
    statusMessage,
    message,
    stack: statusCode !== 404 ? `<pre>${stack.map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n")}</pre>` : "",
    // TODO: check and validate error.data for serialisation into query
    data: error.data
  };
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (event.handled) {
    return;
  }
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    return send(event, JSON.stringify(errorObject));
  }
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (!res) {
    const { template } = await Promise.resolve().then(function () { return errorDev; }) ;
    {
      errorObject.description = errorObject.message;
    }
    if (event.handled) {
      return;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  if (event.handled) {
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  return send(event, html);
});

const _E2XjkS = defineEventHandler((event) => {
  setHeader(event, "Content-Type", "text/plain");
  return render$1(wellKnownOptions.securityTxt);
});
function render$1(options) {
  const mapping = {
    contacts: "Contact",
    expires: "Expires",
    encryption: "Encryption",
    acknowledgments: "Acknowledgments",
    preferredLanguages: "Preferred-Languages",
    canonical: "Canonical",
    policy: "Policy",
    hiring: "Hiring"
  };
  const securityTxtOutput = [];
  Object.keys(mapping).forEach((key) => {
    const optionKey = options[key];
    if (optionKey) {
      if (key === "preferredLanguages") {
        securityTxtOutput.push(`${mapping[key]}: ${optionKey.join(", ")}`);
        return;
      }
      if (key === "expires") {
        securityTxtOutput.push(`${mapping[key]}: ${optionKey}`);
        return;
      }
      optionKey.forEach((value) => {
        securityTxtOutput.push(`${mapping[key]}: ${value}`);
      });
    }
  });
  securityTxtOutput.push("");
  return securityTxtOutput.join("\n");
}

const _icsbdn = defineEventHandler((event) => {
  return sendRedirect(event, wellKnownOptions.changePassword.redirectTo, 302);
});

const _wblzab = defineEventHandler((event) => {
  const url = event.node.req.url;
  if (!url) {
    throw sendError(event, new H3Error("no url found in request"));
  }
  setHeader(event, "Content-Type", "text/plain");
  const path = url.split("/").pop();
  return render(wellKnownOptions.contentUris.find(({ path: optionPath }) => optionPath === path));
});
function render(options) {
  return options.content;
}

const _lazy_kcMQi7 = () => Promise.resolve().then(function () { return boilerplate_post$3; });
const _lazy_AldD6M = () => Promise.resolve().then(function () { return sendMessage_post$1; });
const _lazy_QXcwY7 = () => Promise.resolve().then(function () { return relay_post$1; });
const _lazy_UmKe3C = () => Promise.resolve().then(function () { return reply_post$1; });
const _lazy_1X6zm6 = () => Promise.resolve().then(function () { return updateUser_post$1; });
const _lazy_7XOvC1 = () => Promise.resolve().then(function () { return forgotPassword_post$1; });
const _lazy_wLAu0m = () => Promise.resolve().then(function () { return newUserConfirmation_post$1; });
const _lazy_2ghplS = () => Promise.resolve().then(function () { return resetPassword_post$1; });
const _lazy_5BBo0f = () => Promise.resolve().then(function () { return fetch_post$1; });
const _lazy_SlEdZ0 = () => Promise.resolve().then(function () { return boilerplate_post$1; });
const _lazy_xsVbzw = () => Promise.resolve().then(function () { return createCard_post$3; });
const _lazy_xPwnBM = () => Promise.resolve().then(function () { return createCheckout_post; });
const _lazy_rxlSVu = () => Promise.resolve().then(function () { return createCustomer_post; });
const _lazy_0w5yvC = () => Promise.resolve().then(function () { return createCard_post$1; });
const _lazy_ocOO4q = () => Promise.resolve().then(function () { return listCatalog_post; });
const _lazy_WI6bJW = () => Promise.resolve().then(function () { return payOrder_post$2; });
const _lazy_zs2xcI = () => Promise.resolve().then(function () { return placeOrder_post$2; });
const _lazy_hWPhL2 = () => Promise.resolve().then(function () { return payOrder_post; });
const _lazy_lOjqNk = () => Promise.resolve().then(function () { return payment_post; });
const _lazy_D8ffMl = () => Promise.resolve().then(function () { return placeOrder_post; });
const _lazy_wq5yY8 = () => Promise.resolve().then(function () { return list_post$1; });
const _lazy_GNpDjx = () => Promise.resolve().then(function () { return retrieveItem_post$2; });
const _lazy_3k04uK = () => Promise.resolve().then(function () { return retrieveItem_post; });
const _lazy_so3cps = () => Promise.resolve().then(function () { return images_post$1; });
const _lazy_z4QTko = () => Promise.resolve().then(function () { return add_post$1; });
const _lazy_wN5pgk = () => Promise.resolve().then(function () { return update_password$1; });
const _lazy_Q675bI = () => Promise.resolve().then(function () { return update_post$1; });
const _lazy_bz5v70 = () => Promise.resolve().then(function () { return secureToken_get$1; });
const _lazy_PsyUP0 = () => Promise.resolve().then(function () { return _ws$1; });
const _lazy_pqDejS = () => Promise.resolve().then(function () { return sse$1; });
const _lazy_ShO9cQ = () => Promise.resolve().then(function () { return renderer$1; });

const handlers = [
  { route: '/api/boilerplate', handler: _lazy_kcMQi7, lazy: true, middleware: false, method: "post" },
  { route: '/api/chat/actions/send-message', handler: _lazy_AldD6M, lazy: true, middleware: false, method: "post" },
  { route: '/api/chat/hooks/relay', handler: _lazy_QXcwY7, lazy: true, middleware: false, method: "post" },
  { route: '/api/chat/hooks/reply', handler: _lazy_UmKe3C, lazy: true, middleware: false, method: "post" },
  { route: '/api/chat/update-user', handler: _lazy_1X6zm6, lazy: true, middleware: false, method: "post" },
  { route: '/api/email/forgot-password', handler: _lazy_7XOvC1, lazy: true, middleware: false, method: "post" },
  { route: '/api/email/new-user-confirmation', handler: _lazy_wLAu0m, lazy: true, middleware: false, method: "post" },
  { route: '/api/email/reset-password', handler: _lazy_2ghplS, lazy: true, middleware: false, method: "post" },
  { route: '/api/feed/fetch', handler: _lazy_5BBo0f, lazy: true, middleware: false, method: "post" },
  { route: '/api/square/boilerplate', handler: _lazy_SlEdZ0, lazy: true, middleware: false, method: "post" },
  { route: '/api/square/create-card', handler: _lazy_xsVbzw, lazy: true, middleware: false, method: "post" },
  { route: '/api/square/create-checkout', handler: _lazy_xPwnBM, lazy: true, middleware: false, method: "post" },
  { route: '/api/square/create-customer', handler: _lazy_rxlSVu, lazy: true, middleware: false, method: "post" },
  { route: '/api/square/customers/create-card', handler: _lazy_0w5yvC, lazy: true, middleware: false, method: "post" },
  { route: '/api/square/list-catalog', handler: _lazy_ocOO4q, lazy: true, middleware: false, method: "post" },
  { route: '/api/square/orders/pay-order', handler: _lazy_WI6bJW, lazy: true, middleware: false, method: "post" },
  { route: '/api/square/orders/place-order', handler: _lazy_zs2xcI, lazy: true, middleware: false, method: "post" },
  { route: '/api/square/pay-order', handler: _lazy_hWPhL2, lazy: true, middleware: false, method: "post" },
  { route: '/api/square/payment', handler: _lazy_lOjqNk, lazy: true, middleware: false, method: "post" },
  { route: '/api/square/place-order', handler: _lazy_D8ffMl, lazy: true, middleware: false, method: "post" },
  { route: '/api/square/products/list', handler: _lazy_wq5yY8, lazy: true, middleware: false, method: "post" },
  { route: '/api/square/products/retrieve-item', handler: _lazy_GNpDjx, lazy: true, middleware: false, method: "post" },
  { route: '/api/square/retrieve-item', handler: _lazy_3k04uK, lazy: true, middleware: false, method: "post" },
  { route: '/api/upload/images', handler: _lazy_so3cps, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/add', handler: _lazy_z4QTko, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/update_password', handler: _lazy_wN5pgk, lazy: true, middleware: false, method: undefined },
  { route: '/api/user/update', handler: _lazy_Q675bI, lazy: true, middleware: false, method: "post" },
  { route: '/api/utils/secure-token', handler: _lazy_bz5v70, lazy: true, middleware: false, method: "get" },
  { route: '/_ws', handler: _lazy_PsyUP0, lazy: true, middleware: false, method: undefined },
  { route: '/sse', handler: _lazy_pqDejS, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_ShO9cQ, lazy: true, middleware: false, method: undefined },
  { route: '/.well-known/security.txt', handler: _E2XjkS, lazy: false, middleware: false, method: undefined },
  { route: '/.well-known/change-password', handler: _icsbdn, lazy: false, middleware: false, method: undefined },
  { route: '/.well-known/apple-developer-merchantid-domain-association', handler: _wblzab, lazy: false, middleware: false, method: undefined },
  { route: '/.well-known/content-uri.txt', handler: _wblzab, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_ShO9cQ, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((_err) => {
      console.error("Error while capturing another error", _err);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      await nitroApp.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const localCall = createCall(toNodeListener(h3App));
  const _localFetch = createFetch(localCall, globalThis.fetch);
  const localFetch = (input, init) => _localFetch(input, init).then(
    (response) => normalizeFetchResponse(response)
  );
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const envContext = event.node.req?.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (envContext?.waitUntil) {
          envContext.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  for (const plugin of plugins) {
    try {
      plugin(app);
    } catch (err) {
      captureError(err, { tags: ["plugin"] });
      throw err;
    }
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const server = new Server(toNodeListener(nitroApp.h3App));
function getAddress() {
  if (d === "stackblitz" || process.env.NITRO_NO_UNIX_SOCKET || process.versions.bun) {
    return 0;
  }
  const socketName = `worker-${process.pid}-${threadId}.sock`;
  if (a) {
    return join("\\\\.\\pipe\\nitro", socketName);
  } else {
    const socketDir = join(tmpdir(), "nitro");
    mkdirSync(socketDir, { recursive: true });
    return join(socketDir, socketName);
  }
}
const listenAddress = getAddress();
server.listen(listenAddress, () => {
  const _address = server.address();
  parentPort.postMessage({
    event: "listen",
    address: typeof _address === "string" ? { socketPath: _address } : { host: "localhost", port: _address.port }
  });
});
trapUnhandledNodeErrors();
async function onShutdown(signal) {
  await nitroApp.hooks.callHook("close");
}
parentPort.on("message", async (msg) => {
  if (msg && msg.event === "shutdown") {
    await onShutdown();
    parentPort.postMessage({ event: "exit" });
  }
});

const _messages = {"appName":"Nuxt","version":"","statusCode":500,"statusMessage":"Server error","description":"An error occurred in the application and the page could not be served. If you are the application owner, check your server logs for details.","stack":""};
const _render = function({ messages }) {
var __t, __p = '';
__p += '<!DOCTYPE html><html data-critters-container><head><title>' +
((__t = ( messages.statusCode )) == null ? '' : __t) +
' - ' +
((__t = ( messages.statusMessage )) == null ? '' : __t) +
' | ' +
((__t = ( messages.appName )) == null ? '' : __t) +
'</title><meta charset="utf-8"><meta content="width=device-width,initial-scale=1,minimum-scale=1" name="viewport"><style>.spotlight{background:linear-gradient(45deg, #00DC82 0%, #36E4DA 50%, #0047E1 100%);opacity:0.8;filter:blur(30vh);height:60vh;bottom:-40vh}*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:var(--un-default-border-color, #e5e7eb)}:before,:after{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}h1{font-size:inherit;font-weight:inherit}pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}h1,p,pre{margin:0}*,:before,:after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / .5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.fixed{position:fixed}.left-0{left:0}.right-0{right:0}.z-10{z-index:10}.mb-6{margin-bottom:1.5rem}.mb-8{margin-bottom:2rem}.h-auto{height:auto}.min-h-screen{min-height:100vh}.flex{display:flex}.flex-1{flex:1 1 0%}.flex-col{flex-direction:column}.overflow-y-auto{overflow-y:auto}.rounded-t-md{border-top-left-radius:.375rem;border-top-right-radius:.375rem}.bg-black\\/5{background-color:#0000000d}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255 / var(--un-bg-opacity))}.p-8{padding:2rem}.px-10{padding-left:2.5rem;padding-right:2.5rem}.pt-14{padding-top:3.5rem}.text-6xl{font-size:3.75rem;line-height:1}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-black{--un-text-opacity:1;color:rgb(0 0 0 / var(--un-text-opacity))}.font-light{font-weight:300}.font-medium{font-weight:500}.leading-tight{line-height:1.25}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media (prefers-color-scheme: dark){.dark\\:bg-black{--un-bg-opacity:1;background-color:rgb(0 0 0 / var(--un-bg-opacity))}.dark\\:bg-white\\/10{background-color:#ffffff1a}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255 / var(--un-text-opacity))}}@media (min-width: 640px){.sm\\:text-2xl{font-size:1.5rem;line-height:2rem}.sm\\:text-8xl{font-size:6rem;line-height:1}}</style><script>(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll(\'link[rel="modulepreload"]\'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();</script></head><body class="font-sans antialiased bg-white px-10 pt-14 dark:bg-black text-black dark:text-white min-h-screen flex flex-col"><div class="fixed left-0 right-0 spotlight"></div><h1 class="text-6xl sm:text-8xl font-medium mb-6">' +
((__t = ( messages.statusCode )) == null ? '' : __t) +
'</h1><p class="text-xl sm:text-2xl font-light mb-8 leading-tight">' +
((__t = ( messages.description )) == null ? '' : __t) +
'</p><div class="bg-white rounded-t-md bg-black/5 dark:bg-white/10 flex-1 overflow-y-auto h-auto"><pre class="text-xl font-light leading-tight z-10 p-8">' +
((__t = ( messages.stack )) == null ? '' : __t) +
'</pre></div></body></html>';
return __p
};
const _template = (messages) => _render({ messages: { ..._messages, ...messages } });
const template$1 = _template;

const errorDev = /*#__PURE__*/Object.freeze({
  __proto__: null,
  template: template$1
});

const boilerplate_post$2 = defineEventHandler(async (event) => {
  await readBody(event);
});

const boilerplate_post$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: boilerplate_post$2
});

useRuntimeConfig();
const sendMessage_post = defineEventHandler(async (event) => {
  const post_data = await readBody(event);
  console.log("send message", post_data);
  post_data.participants; post_data.send; post_data.auth;
});

const sendMessage_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: sendMessage_post
});

useRuntimeConfig();
const relay_post = defineEventHandler(async (event) => {
  const post_data = await readBody(event);
  console.log("post_data", post_data);
  return {
    status: 200,
    data: post_data
  };
});

const relay_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: relay_post
});

useRuntimeConfig();
const reply_post = defineEventHandler(async (event) => {
  const post_data = await readBody(event);
  console.log("post_data", post_data);
  const eventStream = createEventStream(event);
  const interval = setInterval(async () => {
    await eventStream.push(`Message @ ${(/* @__PURE__ */ new Date()).toLocaleTimeString()}`);
  }, 1e3);
  eventStream.onClosed(async () => {
    clearInterval(interval);
    await eventStream.close();
  });
  return eventStream.send();
});

const reply_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: reply_post
});

useRuntimeConfig();
const updateUser_post = defineEventHandler(async (event) => {
  const post_data = await readBody(event);
  console.log("post_data", post_data);
});

const updateUser_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: updateUser_post
});

const config$1 = useRuntimeConfig();
const client$3 = new postmark.ServerClient(process.env.POSTMARK_SERVER_TOKEN);
const forgotPassword_post = defineEventHandler(async (event) => {
  const post_data = await readBody(event);
  console.log("post_data", post_data);
  if (!post_data) {
    return { status: "error", message: "Invalid data" };
  } else {
    const headers_obj = {
      "Content-Type": "application/json",
      accept: "application/json"
    };
    await $fetch(
      `${config$1.public.NUXT_STRAPI_URL}/api/users?${qs.stringify({
        filters: {
          email: post_data.email
        }
      })}`,
      {
        method: "GET",
        headers: headers_obj
      }
    ).then(async (user_data) => {
      if (!user_data.length) {
        return {
          status: "error",
          message: "User not found with provided email."
        };
      } else {
        const generateSecureToken = (length = 48) => {
          return crypto.randomBytes(length).toString("hex");
        };
        const token = generateSecureToken();
        const token_headers_obj = {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${process.env.CUSTOM_PW_RESET_TOKEN}`
        };
        await $fetch(
          `${config$1.public.NUXT_STRAPI_URL}/api/users/${user_data[0].id}`,
          {
            method: "PUT",
            headers: token_headers_obj,
            body: JSON.stringify({
              reset_hash: token
            })
          }
        ).then(async (updated_user) => {
          setTimeout(async () => {
            await $fetch(
              `${config$1.public.NUXT_STRAPI_URL}/api/users/${updated_user.id}`,
              {
                method: "PUT",
                headers: token_headers_obj,
                body: JSON.stringify({
                  reset_hash: ""
                })
              }
            );
          }, 18e5);
          const body = `
                  <!DOCTYPE html>
                  <html lang="en">
                  <head>
                      <meta charset="UTF-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <title>Welcome to the nSight Family</title>
                  </head>
                  <body style="font-family: Arial, sans-serif; background-color: #000000; margin: 0; padding: 0; height: 100vh;">
                      <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #000000; margin: 0; padding: 0; height: inherit;">
                          <tr>
                              <td align="center" style="padding: 20px;">
                                  <table role="presentation" style="width: 600px; border-collapse: collapse; border-radius: 10px;">
                                      <tr>
                                          <td align="center" style="padding: 0px;  border-radius: 10px; overflow: hidden;">
                                              <img src="https://res.cloudinary.com/nsight/image/upload/v1716956060/welcome_banner_86a1a17412.jpg" alt="nSight Logo" style="width: 100%; height: auto;">
                                          </td>
                                      </tr>
                                      <tr style="margin: -4px 26px 30px 26px;
                                          display: block;
                                          padding: 30px;
                                          background: #ffffff;
                                          border-bottom-left-radius: 15px;
                                          border-bottom-right-radius: 15px;"
                                        >
                                          <td>
                                              <h1 style="margin: 0 0 20px; font-size: 24px; color: #333333;">Hello, ${updated_user.first_name} ${updated_user.last_name}!</h1>
                                              <p style="margin: 0 0 20px 0; font-size: 16px; color: #333333;">Please click here to reset your password. This link will expire in 30 minutes.</p>
                                              <a href="${process.env.LOCAL_URL}/reset-password?token=${updated_user.reset_hash}" style="display: inline-block; padding: 10px 20px; margin: 0 0 20px; background-color: #f6e232; color: #272727; text-decoration: none; border-radius: 5px;">Login</a>
                                              <p style="margin: 0 0 20px 0; font-size: 16px; color: #333333;">If you did not request a password reset, please ignore this email.</p>
                                              <p style="margin: 0; font-size: 16px; color: #333333;">See you on the other side.</p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td align="center" style="padding: 20px; background-color: #000000; color: #ffffff;">
                                              <p style="margin: 0; font-size: 14px;">&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} nSight. All rights reserved.</p>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                      </table>
                  </body>
                  </html>`;
          const msg = {
            From: "info@nsight.online",
            To: post_data.email,
            Subject: "Reset your nSight password",
            HtmlBody: body,
            TextBody: "Let's reset your nSight password.",
            TrackOpens: true,
            MessageStream: "outbound"
          };
          try {
            client$3.sendEmail(msg);
            return { status: "success", message: "Email sent successfully" };
          } catch (error) {
            console.error(error);
            return {
              status: "error",
              message: "Failed to send email",
              error
            };
          }
        }).catch((error) => {
          console.log("error", error);
          return { status: "error", message: "Failed to update user" };
        });
      }
    });
  }
});

const forgotPassword_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: forgotPassword_post
});

const client$2 = new postmark.ServerClient(process.env.POSTMARK_SERVER_TOKEN);
const newUserConfirmation_post = defineEventHandler(async (event) => {
  const post_data = await readBody(event);
  console.log("post_data", post_data);
  if (!post_data) {
    return { status: "error", message: "Invalid data" };
  } else {
    const body = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to the nSight Family</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #000000; margin: 0; padding: 0; height: 100vh;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #000000; margin: 0; padding: 0; height: inherit;">
        <tr>
            <td align="center" style="padding: 20px;">
                <table role="presentation" style="width: 600px; border-collapse: collapse; border-radius: 10px;">
                    <tr>
                        <td align="center" style="padding: 0px;  border-radius: 10px; overflow: hidden;">
                            <img src="https://res.cloudinary.com/nsight/image/upload/v1716956060/welcome_banner_86a1a17412.jpg" alt="nSight Logo" style="width: 100%; height: auto;">
                        </td>
                    </tr>
                    <tr style="margin: -4px 26px 30px 26px;
                        display: block;
                        padding: 30px;
                        background: #ffffff;
                        border-bottom-left-radius: 15px;
                        border-bottom-right-radius: 15px;"
                      >
                        <td>
                            <h1 style="margin: 0 0 20px; font-size: 24px; color: #333333;">Hello, ${post_data.full_name}!</h1>
                            <p style="margin: 0 0 20px; font-size: 16px; color: #333333;">If you've got this email, it means that someone thinks very highly of you. ${post_data.inviting_member_name} invited you to join the nSight family, an exclusive tribe of thinkers, dreamers, and doers.</p>
                            <p style="margin: 0 0 20px; font-size: 16px; color: #333333;">Your username is: ${post_data.username}<br>Your password is: ${post_data.password}</p>
                            <a href="https://www.nsight.vip/" style="display: inline-block; padding: 10px 20px; margin: 0 0 20px; background-color: #f6e232; color: #272727; text-decoration: none; border-radius: 5px;">Login</a>
                            <p style="margin: 0; font-size: 16px; color: #333333;">See you on the other side.</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 20px; background-color: #000000; color: #ffffff;">
                            <p style="margin: 0; font-size: 14px;">&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} nSight. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `;
    const msg = {
      From: "info@nsight.online",
      To: post_data.email,
      Subject: "Welcome to the nSight Family",
      HtmlBody: body,
      TextBody: "Welcome to the nSight Family",
      TrackOpens: true,
      MessageStream: "outbound"
    };
    try {
      client$2.sendEmail(msg).then((response) => {
        console.log("Email sent successfully:", response);
        return {
          statusCode: 200,
          data: `Email sent successfully: ${JSON.stringify(response)}`
          // data: `Email sent successfully`,
        };
      });
    } catch (error) {
      console.error("Failed to send email:", error);
      return {
        statusCode: 500,
        data: `Failed to send email: ${error.message}`
      };
    }
  }
});

const newUserConfirmation_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: newUserConfirmation_post
});

new postmark.ServerClient(process.env.POSTMARK_SERVER_TOKEN);
const config = useRuntimeConfig();
const resetPassword_post = defineEventHandler(async (event) => {
  const post_data = await readBody(event);
  let return_data = {};
  console.log("post_data", post_data);
  if (!post_data) {
    return_data = {
      statusCode: 403,
      data: {
        error: "Invalid data"
      }
    };
    return return_data;
  } else {
    try {
      const headers_obj = {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${process.env.CUSTOM_PW_RESET_TOKEN}`
      };
      await $fetch(
        `${config.public.NUXT_STRAPI_URL}/api/users?${qs.stringify({
          filters: {
            reset_hash: post_data.code
          }
        })}`,
        {
          method: "GET",
          headers: headers_obj
        }
      ).then(async (user_data) => {
        if (!user_data.length) {
          console.log("user not found");
          return_data = {
            statusCode: 403,
            data: {
              error: "User not found with provided reset code."
            }
          };
          return return_data;
        } else {
          const update_headers_obj = {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer ${process.env.CUSTOM_PW_RESET_TOKEN}`
          };
          await $fetch(
            `${config.public.NUXT_STRAPI_URL}/api/users/${user_data[0].id}`,
            {
              method: "PUT",
              headers: update_headers_obj,
              body: JSON.stringify({
                password: post_data.password
              })
            }
          ).then(async () => {
            return_data = {
              statusCode: 200,
              message: "Password updated successfully."
            };
            const token_headers_obj = {
              "Content-Type": "application/json",
              accept: "application/json",
              Authorization: `Bearer ${process.env.CUSTOM_PW_RESET_TOKEN}`
            };
            await $fetch(
              `${config.public.NUXT_STRAPI_URL}/api/users/${user_data[0].id}`,
              {
                method: "PUT",
                headers: token_headers_obj,
                body: JSON.stringify({
                  reset_hash: ""
                })
              }
            ).then(async () => {
              console.log("reset code removed");
              return_data = {
                statusCode: 200,
                data: {
                  message: "Password updated successfully."
                }
              };
              return return_data;
            }).catch((error) => {
              console.log("error removing reset code");
              return_data = {
                statusCode: 403,
                data: {
                  error: `Error: ${error}. Reset code not removed.`
                }
              };
              return return_data;
            });
          });
          return return_data;
        }
      }).catch((error) => {
        console.log("error finding user");
        return_data = {
          statusCode: 403,
          data: {
            error: `Error: ${error}. User not found with provided reset code.`
          }
        };
        return return_data;
      });
    } catch (error) {
      console.log("error updating user");
      return_data = {
        statusCode: 403,
        data: {
          error: `Error: ${error}. User not found with provided reset code.`
        }
      };
    }
    return return_data;
  }
});

const resetPassword_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: resetPassword_post
});

const api_root = `${process.env.STRAPI_URL}/api`;
const fetch_post = defineEventHandler(async (event) => {
  var _a;
  const post_data = await readBody(event);
  const friends = (_a = post_data == null ? void 0 : post_data.user) == null ? void 0 : _a.friends;
  try {
    let feed_arr = [];
    const fetchPosts = async () => {
      const posts_response = await $fetch(`${api_root}/posts?${qs.stringify({
        populate: [
          "title",
          "users_permissions_user",
          "users_permissions_user.nsight_id",
          "users_permissions_user.profile_picture",
          "pics",
          "caption",
          "visible",
          "profile",
          "tags",
          "reactions",
          "external_links",
          "comments",
          "comments.comments",
          "comments.comments.commenter",
          "comments.comments.commenter.nsight_id",
          "comments.comments.replies",
          "comments.comments.replies.user",
          "comments.comments.replies.user.nsight_id",
          "images"
        ],
        filters: {
          nsight_id: {
            $in: friends
          }
        },
        sort: "createdAt:desc",
        pagination: {
          page: 1,
          pageSize: 10
        }
      })}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${post_data.token}`
        }
      });
      posts_response.data.forEach((post) => {
        post.type = "post";
      });
      feed_arr = [...feed_arr, ...posts_response.data];
    };
    const fetchPicturePosts = async () => {
      const posts_response = await $fetch(`${api_root}/picture-posts?${qs.stringify({
        populate: [
          "title",
          "data",
          "users_permissions_user",
          "users_permissions_user.nsight_id",
          "users_permissions_user.profile_picture",
          "pics",
          "caption",
          "visible",
          "profile",
          "tags",
          "reactions",
          "external_links",
          "comments",
          "comments.comments",
          "comments.comments.commenter",
          "comments.comments.commenter.nsight_id",
          "comments.comments.replies",
          "comments.comments.replies.user",
          "comments.comments.replies.user.nsight_id",
          "images"
        ],
        filters: {
          nsight_id: {
            $in: friends
          }
        },
        sort: "createdAt:desc",
        pagination: {
          page: 1,
          pageSize: 10
        }
      })}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${post_data.token}`
        }
      });
      posts_response.data.forEach((post) => {
        post.type = "picture-post";
      });
      feed_arr = [...feed_arr, ...posts_response.data];
    };
    const randomize = async () => {
      feed_arr = feed_arr.sort(() => Math.random() - 0.5);
      await rankByUpvotes(feed_arr);
    };
    const rankByUpvotes = async (arr) => {
      let new_arr = arr;
      feed_arr = await new_arr.sort((a, b) => a.reactions.upvotes < b.reactions.upvotes ? 1 : -1);
      await rankByDate(feed_arr);
    };
    const rankByDate = async (arr) => {
      let new_arr = arr;
      feed_arr = await new_arr.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1);
      await rankByComments(new_arr);
    };
    const rankByComments = async (arr) => {
      feed_arr = await arr.sort((a, b) => a.comments.comments.length < b.comments.comments.length ? 1 : -1);
    };
    const rankByReplies = async (arr) => {
      feed_arr = await arr.sort((a, b) => {
        var _a2, _b, _c, _d, _e, _f;
        return ((_c = (_b = (_a2 = a.comments) == null ? void 0 : _a2.comments) == null ? void 0 : _b.replies) == null ? void 0 : _c.length) > ((_f = (_e = (_d = b.comments) == null ? void 0 : _d.comments) == null ? void 0 : _e.replies) == null ? void 0 : _f.length) ? 1 : -1;
      });
    };
    await fetchPosts();
    await fetchPicturePosts();
    await randomize();
    if (feed_arr.length) {
      return {
        status: 200,
        data: feed_arr,
        message: "Successfully fetched feed"
      };
    } else {
      return {
        status: 204,
        data: [],
        message: "No content"
      };
    }
  } catch (error) {
    console.error("Error fetching feed:", error);
    return {
      status: 500,
      data: [],
      message: "Error"
    };
  }
});

const fetch_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: fetch_post
});

const environment$4 = SquareEnvironment.Sandbox;
const token$4 = process.env.SQUARE_ACCESS_TOKEN;
const boilerplate_post = defineEventHandler(async (event) => {
  const post_data = await readBody(event);
  console.log("Coming from the front end", post_data);
  try {
    const client = new SquareClient({ environment: environment$4, token: token$4 });
  } catch (error) {
    console.error("Error retrieving item", error);
    return {
      status: 500,
      body: {
        message: `An error occurred: ${error}`
      }
    };
  }
});

const boilerplate_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: boilerplate_post
});

const client$1 = new SquareClient({
  environment: process.env.SQUARE_ENVIRONMENT == "production" ? SquareEnvironment.Production : SquareEnvironment.Sandbox,
  // Environment.Production or Environment.Sandbox for testing
  token: process.env.SQUARE_ACCESS_TOKEN
});
const createCard_post$2 = defineEventHandler(async (event) => {
  const post_data = await readBody(event);
  console.log("body", post_data);
  const new_card = await client$1.cards.create(post_data);
  return {
    statusCode: 200,
    body: JSONBig.stringify(new_card)
  };
});

const createCard_post$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: createCard_post$2
});

const createCheckout_post = /*#__PURE__*/Object.freeze({
  __proto__: null
});

const createCustomer_post = /*#__PURE__*/Object.freeze({
  __proto__: null
});

const client = new SquareClient({
  environment: process.env.SQUARE_ENVIRONMENT == "production" ? SquareEnvironment.Production : SquareEnvironment.Sandbox,
  // Environment.Production or Environment.Sandbox for testing
  token: process.env.SQUARE_ACCESS_TOKEN
});
const createCard_post = defineEventHandler(async (event) => {
  const post_data = await readBody(event);
  const card = await client.cards.create(post_data);
  if (!card.errors) {
    return {
      status: 200,
      body: {
        card: JSONBig.stringify(card)
      }
    };
  } else {
    return {
      status: 400,
      body: {
        message: "An error occurred while creating card."
      }
    };
  }
});

const createCard_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: createCard_post
});

const listCatalog_post = /*#__PURE__*/Object.freeze({
  __proto__: null
});

const environment$3 = SquareEnvironment.Sandbox;
const token$3 = process.env.SQUARE_ACCESS_TOKEN;
const payOrder_post$1 = defineEventHandler(async (event) => {
  const post_data = await readBody(event);
  console.log("Pay Order Data front end", post_data);
  try {
    const client = new SquareClient({ environment: environment$3, token: token$3 });
    const response = await client.payments.create({
      idempotencyKey: post_data.idempotencyKey,
      sourceId: post_data.sourceId,
      customerId: post_data.customerId,
      locationId: post_data.locationId,
      orderId: post_data.order_id,
      amountMoney: {
        amount: BigInt(post_data.amountMoney.amount),
        currency: post_data.amountMoney.currency
      }
    });
    return {
      status: 200,
      body: JSONBig.parse(JSONBig.stringify(response))
    };
  } catch (error) {
    console.error("Error retrieving item", error);
    return {
      status: 500,
      body: {
        message: `An error occurred processing payment: ${error}`,
        errors: JSON.parse(error == null ? void 0 : error.body)
      }
    };
  }
});

const payOrder_post$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: payOrder_post$1
});

const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate

let poolPtr = rnds8Pool.length;
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    crypto.randomFillSync(rnds8Pool);
    poolPtr = 0;
  }

  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

const native = {
  randomUUID: crypto.randomUUID
};

function v4(options, buf, offset) {
  if (native.randomUUID && !buf && !options) {
    return native.randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return unsafeStringify(rnds);
}

const environment$2 = SquareEnvironment.Sandbox;
const token$2 = process.env.SQUARE_ACCESS_TOKEN;
const placeOrder_post$1 = defineEventHandler(async (event) => {
  var _a;
  const post_data = await readBody(event);
  console.log("Coming from the front end", post_data);
  const client = new SquareClient({ environment: environment$2, token: token$2 });
  if (!((_a = post_data == null ? void 0 : post_data.order) == null ? void 0 : _a.lineItems)) {
    throw new Error("Missing required fields in post_data");
  }
  post_data.idempotencyKey = v4();
  post_data.order.idempotencyKey = v4();
  post_data.order.lineItems.forEach((lineItem) => {
    if (typeof lineItem.quantity !== "number" || typeof lineItem.basePriceMoney.amount !== "number") {
      throw new Error("Invalid data types in lineItem");
    }
    lineItem.quantity = lineItem.quantity.toString();
    lineItem.basePriceMoney.amount = BigInt(lineItem.basePriceMoney.amount);
    lineItem["catalogObjectId"] = lineItem.id;
    delete lineItem.name;
    if (lineItem.parent_name) {
      delete lineItem.parent_name;
    }
  });
  try {
    const response = await client.orders.create({
      idempotencyKey: v4(),
      order: post_data.order
    });
    return {
      statusCode: 200,
      data: JSONBig.parse(JSONBig.stringify(response))
    };
  } catch (error) {
    console.error("An error occurred:", error);
    return {
      statusCode: 500,
      data: {
        error
      }
    };
  }
});

const placeOrder_post$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: placeOrder_post$1
});

const payOrder_post = /*#__PURE__*/Object.freeze({
  __proto__: null
});

const payment_post = /*#__PURE__*/Object.freeze({
  __proto__: null
});

const placeOrder_post = /*#__PURE__*/Object.freeze({
  __proto__: null
});

const environment$1 = SquareEnvironment.Sandbox;
const token$1 = process.env.SQUARE_ACCESS_TOKEN;
const list_post = defineEventHandler(async (event) => {
  const post_data = await readBody(event);
  console.log("List Products post", post_data);
  try {
    let products = [];
    let categories = [];
    const client = new SquareClient({
      environment: environment$1,
      token: token$1
    });
    const fetchProductOptions = async (product) => {
      var _a, _b, _c;
      console.log("product itemData options", product.itemData.itemOptions);
      if (!product.itemData.itemOptions) {
        console.log("no options found");
        return;
      } else {
        if (((_a = product.itemData) == null ? void 0 : _a.itemOptions) && ((_c = (_b = product.itemData) == null ? void 0 : _b.itemOptions) == null ? void 0 : _c.length) > 0) {
          console.log("grabbing options..");
          const optionPromises = product.itemData.itemOptions.map(async (option) => {
            const optionResponse = await client.catalog.object.get({
              objectId: option.itemOptionId
            });
            return optionResponse.object;
          });
          product["options"] = await Promise.all(optionPromises);
        }
      }
    };
    const fetchProductImages = async (product) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
      if (!product.itemData.imageIds) {
        await fetchProductOptions(product);
        products.push(product);
        return;
      } else {
        if (((_a = product.itemData) == null ? void 0 : _a.imageIds) && ((_c = (_b = product == null ? void 0 : product.itemData) == null ? void 0 : _b.imageIds) == null ? void 0 : _c.length) > 0) {
          const imagePromises = (_e = (_d = product == null ? void 0 : product.itemData) == null ? void 0 : _d.imageIds) == null ? void 0 : _e.map(async (imageId) => {
            const imageResponse = await client.catalog.object.get({
              objectId: imageId
            });
            return imageResponse.object;
          });
          product["images"] = await Promise.all(imagePromises);
          if (((_f = product == null ? void 0 : product.itemData) == null ? void 0 : _f.variations) && ((_h = (_g = product == null ? void 0 : product.itemData) == null ? void 0 : _g.variations) == null ? void 0 : _h.length) > 0) {
            for (const variation of product.itemData.variations) {
              if (((_i = variation.itemVariationData) == null ? void 0 : _i.imageIds) && ((_k = (_j = variation.itemVariationData) == null ? void 0 : _j.imageIds) == null ? void 0 : _k.length) > 0) {
                const variationImagePromises = (_m = (_l = variation == null ? void 0 : variation.itemVariationData) == null ? void 0 : _l.imageIds) == null ? void 0 : _m.map(
                  async (imageId) => {
                    const imageResponse = await client.catalog.object.get({
                      objectId: imageId
                    });
                    return imageResponse.object;
                  }
                );
                variation["images"] = await Promise.all(variationImagePromises);
              }
            }
          }
          await fetchProductOptions(product);
          products.push(product);
        }
      }
    };
    const fetchProducts = async () => {
      const result = await client.catalog.list({});
      for (const obj of result.data) {
        if (obj.type === "ITEM") {
          await fetchProductImages(obj);
        }
        if (obj.type === "CATEGORY") {
          categories.push(obj);
        }
      }
    };
    const fetchCategories = async () => {
      for (const category of categories) {
        const categoryResponse = await client.catalog.object.get({
          objectId: category.id
        });
        categories.push(categoryResponse.object);
      }
    };
    const populate_categories = async () => {
      categories.forEach(async (category) => {
        category["products"] = [];
        for (const product of products) {
          if (product.itemData.categories) {
            product.itemData.categories.forEach((prod_category) => {
              if (prod_category.id === category.id) {
                category.products.push(product);
              }
            });
          }
        }
      });
    };
    await fetchProducts();
    await populate_categories();
    if (products.length) {
      const return_obj = {
        status: 200,
        body: {
          products: JSONBig.stringify(products),
          categories: JSONBig.stringify(categories)
        }
      };
      return return_obj;
    } else {
      console.log("No products found", products);
      return {
        status: 204,
        body: {
          message: "No products found."
        }
      };
    }
  } catch (error) {
    return {
      status: 400,
      body: {
        message: `An error occurred while fetching products: ${error}`
      }
    };
  }
});

const list_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: list_post
});

const environment = SquareEnvironment.Sandbox;
const token = process.env.SQUARE_ACCESS_TOKEN;
const retrieveItem_post$1 = defineEventHandler(async (event) => {
  const post_data = await readBody(event);
  console.log("Coming from the front end", post_data);
  try {
    const client = new SquareClient({
      environment,
      token
    });
    let item = await client.catalog.object.get({
      objectId: post_data
    });
    return {
      status: 200,
      body: JSONBig.stringify(item)
    };
  } catch (error) {
    console.error("Error retrieving item", error);
    return {
      status: 500,
      body: {
        message: `An error occurred: ${error}`
      }
    };
  }
});

const retrieveItem_post$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: retrieveItem_post$1
});

const retrieveItem_post = /*#__PURE__*/Object.freeze({
  __proto__: null
});

v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true
});
const uploadToCloudinary = (filePath) => {
  return new Promise((resolve, reject) => {
    v2.uploader.upload(filePath, { folder: "uploads" }, (error, result) => {
      if (error) {
        console.error("Cloudinary Upload Error:", error);
        return reject(error);
      }
      resolve(result);
    });
  });
};
const images_post = defineEventHandler(async (event) => {
  try {
    const form = new multiparty.Form();
    const data = await new Promise((resolve, reject) => {
      form.parse(event.node.req, (err, fields, files) => {
        if (err)
          reject(err);
        else
          resolve({ fields, files });
      });
    });
    if (!data.files.files || data.files.files.length === 0) {
      console.warn("No files received in formData");
      return { statusCode: 400, message: "No files received" };
    }
    console.log("Received files:", data.files.files.map((f) => f.originalFilename));
    const uploadResults = await Promise.all(
      data.files.files.map((file) => uploadToCloudinary(file.path))
    );
    data.files.files.forEach((file) => fs.unlinkSync(file.path));
    return { statusCode: 200, message: "Images uploaded successfully", data: uploadResults };
  } catch (error) {
    console.error("Upload failed:", error);
    return { statusCode: 500, message: "Upload failed", error: error.message };
  }
});

const images_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: images_post
});

const add_post = defineEventHandler(async (event) => {
  const post_data = await readBody(event);
  console.log("Add new friend POST data", post_data);
  return {
    status: "success",
    message: post_data
  };
});

const add_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: add_post
});

const update_password = defineEventHandler(async (event) => {
  const post_data = await readBody(event);
  console.log("from front end", post_data);
  let return_obj = {
    status: null,
    message: null
  };
  if ((post_data == null ? void 0 : post_data.new_password) !== (post_data == null ? void 0 : post_data.confirm_password)) {
    return_obj.status = "error";
    return_obj.message = "Passwords do not match";
  } else if ((post_data == null ? void 0 : post_data.current_password) !== (post_data == null ? void 0 : post_data.auth.user.password)) {
    return_obj.status = "error";
    return_obj.message = "Current password is incorrect.";
  } else {
    return_obj.status = "success";
    return_obj.message = "Clear to update password";
  }
  return return_obj;
});

const update_password$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: update_password
});

const update_post = defineEventHandler(async (event) => {
  const post_data = await readBody(event);
  console.log("Add new friend POST data", post_data);
  $fetch(
    `${process.env.STRAPI_URL}/api/users/${post_data == null ? void 0 : post_data.user.id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${post_data == null ? void 0 : post_data.token}`,
        "Content-Type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify(post_data == null ? void 0 : post_data.user)
    }
  ).then((res) => {
    console.log("Updated nSight user.");
  }).catch((err) => {
    console.log("Update user error", err);
  });
  return {
    status: "success",
    message: "User updated successfully"
  };
});

const update_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: update_post
});

const secureToken_get = defineEventHandler(async (event) => {
  return {
    token: crypto.randomBytes(48).toString("hex")
  };
});

const secureToken_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: secureToken_get
});

const _ws = defineWebSocketHandler({
  open(peer) {
    console.log("[ws] open", peer);
  },
  message(peer, message) {
    console.log("[ws] message", peer, message);
    if (message.text().includes("ping")) {
      peer.send("pong");
    }
  },
  close(peer, event) {
    console.log("[ws] close", peer, event);
  },
  error(peer, error) {
    console.log("[ws] error", peer, error);
  }
});

const _ws$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _ws
});

const sse = defineEventHandler(async (event) => {
  const eventStream = createEventStream(event);
  const interval = setInterval(async () => {
    await eventStream.push(`Message @ ${(/* @__PURE__ */ new Date()).toLocaleTimeString()}`);
  }, 1e3);
  eventStream.onClosed(async () => {
    clearInterval(interval);
    await eventStream.close();
  });
  return eventStream.send();
});

const sse$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: sse
});

const Vue3 = version.startsWith("3");

function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref, lastKey = "") {
  if (ref instanceof Promise)
    return ref;
  const root = resolveUnref(ref);
  if (!ref || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r, lastKey));
  if (typeof root === "object") {
    return Object.fromEntries(
      Object.entries(root).map(([k, v]) => {
        if (k === "titleTemplate" || k.startsWith("on"))
          return [k, unref(v)];
        return [k, resolveUnrefHeadInput(v, k)];
      })
    );
  }
  return root;
}

const VueReactivityPlugin = defineHeadPlugin({
  hooks: {
    "entries:resolve": function(ctx) {
      for (const entry of ctx.entries)
        entry.resolvedInput = resolveUnrefHeadInput(entry.input);
    }
  }
});

const headSymbol = "usehead";
function vueInstall(head) {
  const plugin = {
    install(app) {
      if (Vue3) {
        app.config.globalProperties.$unhead = head;
        app.config.globalProperties.$head = head;
        app.provide(headSymbol, head);
      }
    }
  };
  return plugin.install;
}
function createServerHead(options = {}) {
  const head = createServerHead$1(options);
  head.use(VueReactivityPlugin);
  head.install = vueInstall(head);
  return head;
}

const unheadPlugins = [];

const appHead = {"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"}],"link":[{"rel":"preconnect","href":"https://fonts.googleapis.com"},{"rel":"preconnect","href":"https://fonts.gstatic.com","crossorigin":""},{"rel":"stylesheet","href":"https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"},{"rel":"apple-touch-icon","sizes":"180x180","href":"https://res.cloudinary.com/nsight/image/upload/v1723398229/apple_touch_icon_49ca9d5032.png"},{"rel":"icon","type":"image/png","sizes":"32x32","href":"https://res.cloudinary.com/nsight/image/upload/v1723398229/favicon_32x32_fb523a84f5.png"},{"rel":"icon","type":"image/png","sizes":"16x16","href":"https://res.cloudinary.com/nsight/image/upload/v1723398229/favicon_16x16_5d87179987.png"},{"rel":"manifest","href":"https://res.cloudinary.com/nsight/raw/upload/v1723398230/site_641beadb95.webmanifest"}],"style":[],"script":[{"src":"https://sandbox.web.squarecdn.com/v1/square.js"},{"src":"~/assets/js/uikit.min.js"},{"src":"https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js","type":"module"},{"src":"https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js","nomodule":true},{"defer":true,"src":"/uikit.min.js"},{"defer":true,"src":"/uikit-icons.min.js"}],"noscript":[]};

const appRootId = "__nuxt";

const appRootTag = "div";

function buildAssetsDir() {
  return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
  return joinURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
  const app = useRuntimeConfig().app;
  const publicBase = app.cdnURL || app.baseURL;
  return path.length ? joinURL(publicBase, ...path) : publicBase;
}

globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const getClientManifest = () => import('file:///Applications/MAMP/htdocs/www/NSIGHT_PROJECT/nsight-frontend/.nuxt/dist/server/client.manifest.mjs').then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
const getSPARenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  const spaTemplate = await Promise.resolve().then(function () { return _virtual__spaTemplate; }).then((r) => r.template).catch(() => "");
  const options = {
    manifest,
    renderToString: () => `<${appRootTag}${` id="${appRootId}"` }>${spaTemplate}</${appRootTag}>`,
    buildAssetsURL
  };
  const renderer = createRenderer(() => () => {
  }, options);
  const result = await renderer.renderToString({});
  const renderToString = (ssrContext) => {
    const config = useRuntimeConfig();
    ssrContext.modules = ssrContext.modules || /* @__PURE__ */ new Set();
    ssrContext.payload = {
      _errors: {},
      serverRendered: false,
      data: {},
      state: {},
      once: /* @__PURE__ */ new Set()
    };
    ssrContext.config = {
      public: config.public,
      app: config.app
    };
    return Promise.resolve(result);
  };
  return {
    rendererContext: renderer.rendererContext,
    renderToString
  };
});
const PAYLOAD_URL_RE = /\/_payload(\.[a-zA-Z0-9]+)?.json(\?.*)?$/ ;
const renderer = defineRenderHandler(async (event) => {
  const nitroApp = useNitroApp();
  const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery$1(event) : null;
  if (ssrError && ssrError.statusCode) {
    ssrError.statusCode = parseInt(ssrError.statusCode);
  }
  if (ssrError && !("__unenv__" in event.node.req)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found: /__nuxt_error"
    });
  }
  const isRenderingIsland = false ;
  const islandContext = void 0;
  let url = ssrError?.url || islandContext?.url || event.path;
  const isRenderingPayload = PAYLOAD_URL_RE.test(url) && !isRenderingIsland;
  if (isRenderingPayload) {
    url = url.substring(0, url.lastIndexOf("/")) || "/";
    event._path = url;
    event.node.req.url = url;
  }
  const routeOptions = getRouteRules(event);
  const head = createServerHead({
    plugins: unheadPlugins
  });
  const headEntryOptions = { mode: "server" };
  {
    head.push(appHead, headEntryOptions);
  }
  const ssrContext = {
    url,
    event,
    runtimeConfig: useRuntimeConfig(),
    noSSR: !!true   ,
    head,
    error: !!ssrError,
    nuxt: void 0,
    /* NuxtApp */
    payload: ssrError ? { error: ssrError } : {},
    _payloadReducers: {},
    islandContext
  };
  const renderer = await getSPARenderer() ;
  const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
    if (ssrContext._renderResponse && error.message === "skipping render") {
      return {};
    }
    const _err = !ssrError && ssrContext.payload?.error || error;
    await ssrContext.nuxt?.hooks.callHook("app:error", _err);
    throw _err;
  });
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult: _rendered });
  if (ssrContext._renderResponse) {
    return ssrContext._renderResponse;
  }
  if (ssrContext.payload?.error && !ssrError) {
    throw ssrContext.payload.error;
  }
  if (isRenderingPayload) {
    const response2 = renderPayloadResponse(ssrContext);
    return response2;
  }
  const inlinedStyles = [];
  const NO_SCRIPTS = routeOptions.experimentalNoScripts;
  const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
  head.push({ style: inlinedStyles });
  {
    const link = [];
    for (const style in styles) {
      const resource = styles[style];
      {
        link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file) });
      }
    }
    head.push({ link }, headEntryOptions);
  }
  if (!NO_SCRIPTS && !isRenderingIsland) {
    head.push({
      link: getPreloadLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    head.push({
      link: getPrefetchLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    head.push({
      script: renderPayloadJsonScript({ id: "__NUXT_DATA__", ssrContext, data: ssrContext.payload }) 
    }, {
      ...headEntryOptions,
      // this should come before another end of body scripts
      tagPosition: "bodyClose",
      tagPriority: "high"
    });
  }
  if (!routeOptions.experimentalNoScripts && !isRenderingIsland) {
    head.push({
      script: Object.values(scripts).map((resource) => ({
        type: resource.module ? "module" : null,
        src: renderer.rendererContext.buildAssetsURL(resource.file),
        defer: resource.module ? null : true,
        crossorigin: ""
      }))
    }, headEntryOptions);
  }
  const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(head);
  const htmlContext = {
    island: isRenderingIsland,
    htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
    head: normalizeChunks([headTags, ssrContext.styles]),
    bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
    bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
    body: [_rendered.html],
    bodyAppend: [bodyTags]
  };
  await nitroApp.hooks.callHook("render:html", htmlContext, { event });
  const response = {
    body: renderHTMLDocument(htmlContext),
    statusCode: getResponseStatus(event),
    statusMessage: getResponseStatusText(event),
    headers: {
      "content-type": "text/html;charset=utf-8",
      "x-powered-by": "Nuxt"
    }
  };
  return response;
});
function lazyCachedFunction(fn) {
  let res = null;
  return () => {
    if (res === null) {
      res = fn().catch((err) => {
        res = null;
        throw err;
      });
    }
    return res;
  };
}
function normalizeChunks(chunks) {
  return chunks.filter(Boolean).map((i) => i.trim());
}
function joinTags(tags) {
  return tags.join("");
}
function joinAttrs(chunks) {
  return chunks.join(" ");
}
function renderHTMLDocument(html) {
  return `<!DOCTYPE html><html${joinAttrs(html.htmlAttrs)}><head>${joinTags(html.head)}</head><body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body></html>`;
}
function renderPayloadResponse(ssrContext) {
  return {
    body: stringify(splitPayload(ssrContext).payload, ssrContext._payloadReducers) ,
    statusCode: getResponseStatus(ssrContext.event),
    statusMessage: getResponseStatusText(ssrContext.event),
    headers: {
      "content-type": "application/json;charset=utf-8" ,
      "x-powered-by": "Nuxt"
    }
  };
}
function renderPayloadJsonScript(opts) {
  const contents = opts.data ? stringify(opts.data, opts.ssrContext._payloadReducers) : "";
  const payload = {
    type: "application/json",
    id: opts.id,
    innerHTML: contents,
    "data-ssr": !(true )
  };
  if (opts.src) {
    payload["data-src"] = opts.src;
  }
  return [
    payload,
    {
      innerHTML: `window.__NUXT__={};window.__NUXT__.config=${uneval(opts.ssrContext.config)}`
    }
  ];
}
function splitPayload(ssrContext) {
  const { data, prerenderedAt, ...initial } = ssrContext.payload;
  return {
    initial: { ...initial, prerenderedAt },
    payload: { data, prerenderedAt }
  };
}

const renderer$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: renderer
});

const template = "";

const _virtual__spaTemplate = /*#__PURE__*/Object.freeze({
  __proto__: null,
  template: template
});
//# sourceMappingURL=index.mjs.map
