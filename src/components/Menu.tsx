import * as React from 'react'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import SwapHoriz from '@mui/icons-material/SwapHoriz'
import ShareIcon from '@mui/icons-material/Share'
import DocSwitcher from './DocSwitcher'
import { Doc } from 'tlfs'
import { DocId, PeerId } from '..'
import PeerSelector from './PeerSelector'

type Props = {
  addDoc: () => void
  setDoc: (id: DocId) => void
  shareWithPeer: (id: DocId, peer: PeerId) => void
  docs: Doc[]
  selectedDoc: DocId
  connectedPeers: PeerId[]
}
export default function SpeedDialTooltipOpen({
  addDoc,
  docs,
  setDoc,
  selectedDoc,
  shareWithPeer,
  connectedPeers
}: Props) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [docSwitcherOpen, setDocSwitcherOpen] = React.useState(false)
  const [shareWithPeerOpen, setShareWithPeerOpen] = React.useState(false)

  const values = docs.map((d) => d.id())
  const actions = [
    {
      icon: <SwapHoriz />,
      name: 'Change Document',
      fn: () => setDocSwitcherOpen(true)
    },
    { icon: <ShareIcon />, name: 'Share', fn: () => setShareWithPeerOpen(true) }
  ]

  return (
    <>
      <PeerSelector
        onClose={(maybePeer) => {
          if (maybePeer) {
            shareWithPeer(selectedDoc, maybePeer)
          }
          setShareWithPeerOpen(false)
        }}
        open={shareWithPeerOpen}
        values={connectedPeers}
      />
      <DocSwitcher
        open={docSwitcherOpen}
        onClose={(doc) => {
          setDoc(doc)
          setDocSwitcherOpen(false)
        }}
        selectedValue={selectedDoc}
        values={values}
        addDoc={addDoc}
      />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: 'absolute', bottom: 48, right: 48 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={action.fn}
          />
        ))}
      </SpeedDial>
    </>
  )
}
