import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { DocId, PeerId } from '..'

type Props = {
  peer: PeerId
  doc: DocId
  accept: () => void
  ignore: () => void
  open: boolean
}
export default function InvitationDialog({
  accept,
  doc,
  ignore,
  open,
  peer
}: Props) {
  return (
    <Dialog open={open} onClose={ignore}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`Peer ${peer} invite you to collaborate on ${doc}`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={ignore}>Ignore</Button>
        <Button onClick={accept}>Accept</Button>
      </DialogActions>
    </Dialog>
  )
}
