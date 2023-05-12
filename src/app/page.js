'use client'

import React, { useEffect, useRef } from 'react'
import SaveIcon from '@mui/icons-material/Save'
import Flow from '@/components/Flow'
import { ReactFlowProvider, useNodesState } from 'reactflow'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
} from 'firebase/firestore'
import { app } from '@/config/firebase.config'

export default function Home() {
  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes, onNodesChange] = useNodesState([])

  const db = getFirestore(app)

  useEffect(() => {
    ;(async () => {
      const querySnapshot = await getDocs(collection(db, 'nodes'))
      const data = JSON.parse(
        querySnapshot.docs[0]._document.data.value.mapValue.fields.nodes
          .stringValue
      )
    })()
  }, [])

  console.log(nodes)
  return (
    <main className="w-screen h-screen relative" ref={reactFlowWrapper}>
      <ReactFlowProvider>
        <Flow
          reactFlowWrapper={reactFlowWrapper}
          nodes={nodes}
          setNodes={setNodes}
          onNodesChange={onNodesChange}
        />
      </ReactFlowProvider>
      <div
        className="absolute top-[1rem] right-[1rem] z-[1500] p-2.5 bg-[#7cd500] hover:bg-[#63a802] cursor-pointer rounded"
        onClick={async () => {
          try {
            const querySnapshot = await getDocs(collection(db, 'nodes'))
            if (querySnapshot?.length) {
              querySnapshot.forEach(async ({ id }) => {
                await deleteDoc(doc(db, 'nodes', id))
              })
            }
            if (nodes?.length) {
              const docRef = await addDoc(collection(db, 'nodes'), {
                nodes: JSON.stringify(nodes),
              })
              console.log('Document written with ID: ', docRef.id)
            }
          } catch (e) {
            console.error('Error adding document: ', e)
          }
        }}
      >
        <SaveIcon className="text-2xl text-white" />
      </div>
    </main>
  )
}
