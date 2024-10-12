<template>
    <aside class="left-sidebar">
        <div class="scroll-sidebar">
            <nav class="sidebar-nav">
                <ul id="sidebarnav">
                    <!-- <li :class="{ active: $route.path === '/' }"> <a class="waves-effect waves-dark" href="/"
                            aria-expanded="false"><i class="fa fa-tachometer"></i><span
                                class="hide-menu">Dashboard</span></a>
                    </li> -->
                    <!-- <li :class="{ active: $route.path === '/profile' }" > <a class="waves-effect waves-dark" href="/profile" aria-expanded="false"><i
                                class="fa fa-user-circle-o"></i><span class="hide-menu">Profile</span></a>
                    </li> -->
                    <li :class="{ active: $route.path === '/category' }" > <a class="waves-effect waves-dark" href="/category" aria-expanded="false"><i class="bi bi-tag"></i><span class="hide-menu">Job Category</span></a>
                    </li>
                    <li :class="{ active: $route.path.startsWith('/jobs') }" > <a class="waves-effect waves-dark" href="/jobs" aria-expanded="false"><i class="bi bi-briefcase"></i><span class="hide-menu">Jobs</span></a>
                    </li>
                </ul>
            </nav>
        </div>
    </aside>
</template>

<script>

</script>