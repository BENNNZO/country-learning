"use client"

import React, { useState, useEffect } from 'react';

import World from "@/assets/world_4.svg"


export default function Home() {

	const [title, setTitle] = useState("null")
	const [pos, setPos] = useState({ x: 0, y: 0 })
	const [state, setState] = useState(false)

	useEffect(() => {
		const paths = document.querySelectorAll("path")
		console.log(paths)

		paths.forEach(element => {
			element.addEventListener("mousemove", (event) => {
				setTitle(element.getAttribute("title"))
				setPos({ x: event.clientX, y: event.clientY })
				setState(true)
			})
			element.addEventListener("mouseout", () => {
				setState(false)
			})
		})

	}, [])

	return (
		<main className="grid place-items-center h-screen bg-slate-300">
			<p
				className='absolute top-0 left-0 px-2 py-1 bg-white rounded-md shadow-md pointer-events-none transition-all ease-out'
				style={{ transform: `translate(calc(${pos.x}px - 50%), calc(${pos.y}px - 125%))`, opacity: `${state ? 1 : 0}` }}
			>
				{title}
			</p>
			<World className="world_map" />
		</main>
	)
}




