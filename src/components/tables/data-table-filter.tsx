'use client'

import { type Table } from "@tanstack/react-table"
import { Input } from "@nhatdev94/common-ui"
import { } from '@nhatdev94/util'
import { useEffect, useRef, useState } from "react"
import { Timeout } from "react-number-format/types/types"

export type DataTableFilterProps<TData> = {
    table: Table<TData>,
    placeholder?: string,
    onSearch: (search: string) => void
}

export function DataTableFilter<TData>({ table, placeholder = 'Search...', onSearch }: DataTableFilterProps<TData>) {
    const [input, setInput] = useState('')

    const timerRef = useRef<Timeout | null>(null)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (timerRef.current) clearTimeout(timerRef.current)
        const value = event.target.value
        setInput(value)
        const trimValue = value.trim()
        if (trimValue !== input.trim()) {
            timerRef.current = setTimeout(() => {
                onSearch(trimValue)
            }, 300)
        }
    }

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current)
        }
    }, [])

    return (
        <Input
            placeholder={placeholder}
            value={input}
            onChange={handleChange}
            type="search"
            className="max-w-xs"
        />
    )
}
