<template>
  <nav class="h-16 border-b bg-muted/40 flex justify-between px-6 items-center">
    <form class="relative w-full h-fit max-w-96">
      <iconify-icon class="absolute top-[50%] translate-y-[-50%] left-2.5 text-muted-foreground" icon="lucide:search" width="18" height="18"></iconify-icon>
      <Input
        :modelValue="''"
        class="w-full pl-8 bg-background"
        type="text"
        placeholder="Search..."
      />
    </form>

    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://avatars.githubusercontent.com/u/89041019?v=4" alt="@DGG" />
          <AvatarFallback>DG</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import Input from '@/components/ui/input/Input.vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
</script>
