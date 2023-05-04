<script lang="ts">

    let extraClass: string
    export {extraClass as class}
    export let extraStyle: string
    export let icon: string
    export let imgIcon: string
    export let img: string
    export let padImg = false
    export let title: string
    export let subtitle: string
    export let music: 'tsygun' | 'garden' | null = null

    export let bg: string;

    export let to: string

    $: finalBg = ''
        // icon === '🎵' || icon === '🎥' ? 'bg-purple-50' :
        //     icon === '👷‍♂️' || icon === '📝' ? 'bg-yellow-50' :
        //         icon === '🍿' || icon === '😋' ? 'bg-rose-50' :
        //             icon === '🚶‍♂️' || icon === '🦙' ? 'bg-green-50' :
        //                 'bg-sky-50'
</script>


<svelte:element this={to ? 'a' : 'div'} href={to}
                class={`rounded-xl  border-dashed border-4     flex flex-col
${to ? 'hover:filter hover:saturate-130 hover:border-blue-700' : ''}
        ${extraClass}`}
                style={extraStyle}>
    {#if img}
        <div class="grow flex flex-col justify-center">
            <img src={img}
                 class={` ${to ? '' : ''}   hover:backdrop-filter rounded-t-xl   ${padImg ? 'p-3' : ''}`}/>

        </div>
    {/if}
    {#if music === 'tsygun'}
        <iframe frameborder="0" class="h-full" src="https://music.yandex.ru/iframe/#album/23426419">Слушайте <a
                href='https://music.yandex.ru/album/23426419'>Хворь</a> — <a
                href='https://music.yandex.ru/artist/8106971'>Tsygun</a>
            на Яндекс Музыке
        </iframe>
    {:else if music === 'garden'}
        <iframe frameborder="0" class="h-full" width="100%"
                src="https://music.yandex.ru/iframe/#playlist/leybovich-nikita/1087">Слушайте <a
                href='https://music.yandex.ru/users/leybovich-nikita/playlists/1087'>The Garden - Horseshit on Route
            66</a> — <a href='https://music.yandex.ru/users/leybovich-nikita'>leybovich-nikita</a> на Яндекс Музыке
        </iframe>
    {/if}

    <!--${to ? 'hover:border-blue-400  border-blue-50 border-4' : 'border-none'}-->
    <div class={`flex items-center    space-x-4  text-lg p-3   h-24

    ${img ? 'rounded-b-xl ' : `rounded-xl ${to ? '' : ''}`}
    ${bg ? '' : finalBg}
    `} style={bg ? `background: ${bg}` : ''}>

        {#if icon}
            <span class="text-xl md:text-2xl">{icon}</span>
        {/if}

        {#if imgIcon}
            <img src={imgIcon}/>
        {/if}

        <div>
            <div class="text-lg font-bold">{title}</div>
            <div class="text-sm font-normal">{subtitle}</div>
        </div>
    </div>
</svelte:element>
