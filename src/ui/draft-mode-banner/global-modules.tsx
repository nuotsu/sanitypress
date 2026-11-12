'use client'

import { createDataAttribute } from 'next-sanity'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ROUTES } from '@/lib/env'
import { dataset, projectId } from '@/sanity/env'
import { getGlobalModulesAction, type GlobalModuleItem } from './actions'

export default function GlobalModules() {
  const pathname = usePathname()
  const [items, setItems] = useState<GlobalModuleItem[]>([])

  useEffect(() => {
    let ignore = false
    getGlobalModulesAction(pathname).then((data) => {
      if (!ignore) setItems(data)
    })
    return () => {
      ignore = true
    }
  }, [pathname])

  if (!items.length) return null

  return (
    <li className="border-t border-current/15 mt-[.5lh] pt-[.5lh]">
      <p>Global modules on this page:</p>

      <ul className="list-disc ps-[2ch]">
        {items.map(({ _id, identifier, path }) => (
          <li key={_id}>
            <a
              href={`/${ROUTES.studio}/presentation/global-module/${_id}?preview=${encodeURIComponent(pathname)}`}
              target="_top"
              className="link"
              data-sanity={createDataAttribute({
                projectId,
                dataset,
                baseUrl: `/${ROUTES.studio}`,
                id: _id,
                type: 'global-module',
                path: 'identifier',
              }).toString()}
            >
              {identifier || path || 'Untitled'}
            </a>
          </li>
        ))}
      </ul>
    </li>
  )
}
