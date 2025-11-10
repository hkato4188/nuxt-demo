
    <script setup lang="ts">
        const links = [{
        label: 'Installation',
        icon: 'i-heroicons-home',
        to: '/getting-started/installation'
        }, {
        label: 'Horizontal Navigation',
        icon: 'i-heroicons-chart-bar',
        to: '/components/horizontal-navigation'
        }, {
        label: 'Command Palette',
        icon: 'i-heroicons-command-line',
        to: '/components/command-palette'
        }]
    </script>

    <template>
    
        <div>
            <UHorizontalNavigation :links="links" />    
            <slot/>
        </div>
    </template>


