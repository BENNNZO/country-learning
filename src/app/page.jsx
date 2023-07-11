"use client"

import React, { useState, useEffect, useRef } from 'react';

import World from "@/assets/world_4.svg"


export default function Home() {
	const svgRef = useRef()

	const [title, setTitle] = useState("null")
	const [pos, setPos] = useState({ x: 0, y: 0 })
	const [state, setState] = useState(false)
	const [scale, setScale] = useState(1)
	const [origin, setOrigin] = useState({ x: 0, y: 0 })
	const [moveState, setMoveState] = useState(false)
	const [moveInit, setMoveInit] = useState({ x: 0, y: 0 })
	const [moveFinal, setMoveFinal] = useState({ x: 0, y: 0 })
	const [movePos, setMovePos] = useState({ x: 0, y: 0 })
	const [moveDiff, setMoveDiff] = useState({ x: 0, y: 0 })

	useEffect(() => {
		const paths = document.querySelectorAll("path")
		console.log(paths)

		let data = {}

		paths.forEach(element => {
			element.addEventListener("mouseenter", () => {
				setTitle(element.getAttribute("title"))
				setState(true)
			})
			element.addEventListener("mouseout", () => {
				setState(false)
			})
		})

		window.addEventListener("mousemove", (event) => {
			setPos({ x: event.clientX, y: event.clientY })
		})

		window.addEventListener("wheel", (event) => {
			if (event.deltaY > 0) {
				setScale(prev => Math.max(1, prev - 0.05))
			} else {
				setScale(prev => Math.min(3, prev + 0.05))
			}
			setOrigin({ x: event.clientX, y: event.clientY })
		})

		window.addEventListener("mousedown", (event) => {
			setMoveState(true)
			setMoveInit({ x: event.clientX, y: event.clientY })
		})
	}, [])

	useEffect(() => {
		window.addEventListener("mouseup", (event) => {
			setMoveState(false)
			setMoveFinal({ x: event.clientX, y: event.clientY })
			console.log(`${setMoveDiff.x} - (${event.clientX} - ${moveInit.x})`)
			setMoveDiff(prev => ({ x: prev.x - (event.clientX - moveInit.x), y: prev.y - (event.clientY - moveInit.y) }))
		})

		return () => {
			window.removeEventListener("mouseup", (event) => {
				setMoveState(false)
				setMoveFinal({ x: event.clientX, y: event.clientY })
				console.log(`${moveDiff.x} - (${event.clientX} - ${moveInit.x})`)
				setMoveDiff(prev => {
					console.log(`${prev.x} - (${event.clientX} - ${moveInit.x})`)
					return { x: (event.clientX - moveInit.x), y: (event.clientY - moveInit.y) }
				})
			})
		}
	}, [moveInit, moveDiff])

	useEffect(() => {
		if (moveState === true) {
			window.addEventListener("mousemove", e => {
				setMovePos({ x: e.clientX, y: e.clientY })
			})
		}

		return () => window.removeEventListener("mousemove", e => {
			setMovePos({ x: e.clientX, y: e.clientY })
		})
	}, [moveState])

	return (
		<main className="grid place-items-center h-screen bg-slate-300 overflow-hidden select-none">
			<div className='absolute top-0 left-0 flex flex-col gap-1 z-10'>
				<p className='bg-red-400 text-yellow-400'>{JSON.stringify(moveState, null, 4)}</p>
				<p className='bg-red-400 text-yellow-400'>{JSON.stringify(moveInit, null, 4)}</p>
				<p className='bg-red-400 text-yellow-400'>{JSON.stringify(moveFinal, null, 4)}</p>
				<p className='bg-red-400 text-yellow-400'>{JSON.stringify(movePos, null, 4)}</p>
				<p className='bg-red-400 text-yellow-400'>{JSON.stringify(pos, null, 4)}</p>
				<p className='bg-red-400 text-yellow-400'>{JSON.stringify(moveDiff, null, 4)}</p>
			</div>
			<p
				className='select-none absolute z-10 text-slate-700 top-0 left-0 px-2 py-1 bg-white rounded-md shadow-md pointer-events-none transition-all ease-out'
				style={{ 
					transform: `translate(calc(${pos.x}px - 50%), calc(${pos.y}px - 125%))`, 
					opacity: `${state ? 1 : 0}`,
					transformOrigin: `${pos.x}px ${pos.y}px`
				}}
			>
				{title}
			</p>
			<World
				className="world_map ease-out transition-all"
				style={{
					transform: `scale(${scale}) translate(${moveInit.x + movePos.x}px, ${moveInit.y + movePos.y}px)`,
					// transformOrigin: `${origin.x}px ${origin.y/2}px`
				}}	
			/>
		</main>
	)
}




