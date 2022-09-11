import React from 'react'
import clsx from 'clsx'

import styles from './index.module.scss'

interface Props {
  className?: string
  children?: React.ReactNode
}

export const Row: React.FC<Props> = ({ className, children }) => (
  <div className={clsx(className, styles.root)}>
    {children}
  </div>
)
