export * from '../../Components/ui/avatar'
import * as React from 'react'

function Avatar({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="avatar"
      className={`inline-flex items-center justify-center overflow-hidden rounded-full ${className ?? ''}`}
      {...props}
    >
      {children}
    </div>
  )
}

function AvatarImage({ src, alt, className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src={src}
      alt={alt}
      className={`block h-full w-full object-cover ${className ?? ''}`}
      {...props}
    />
  )
}

function AvatarFallback({ children, className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="avatar-fallback"
      className={`flex h-full w-full items-center justify-center bg-muted text-muted-foreground ${className ?? ''}`}
      {...props}
    >
      {children}
    </div>
  )
}

export { Avatar, AvatarImage, AvatarFallback }
