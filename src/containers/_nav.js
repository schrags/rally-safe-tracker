export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Event List',
        to: '/dashboard',
        icon: 'cil-speedometer'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Entries',
        to: '/entries',
        icon: 'cil-list'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Map',
        to: '/map',
        icon: 'cil-map'
      }
    ]
  }
]