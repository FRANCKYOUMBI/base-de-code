"use client";
import React, { Fragment } from "react";
interface SearchBarProps {
    callback: (search: string) => void;
}
export function SearchBar({ callback }: SearchBarProps): React.JSX.Element {
    const [search, setSearch] = React.useState<string>("");
    function handleSearch() {
        callback(search);
    }
    return (
        <Fragment></Fragment>
    )
}