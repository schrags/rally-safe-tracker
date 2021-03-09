export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Select Event',
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
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Results',
        to: '/results',
        icon: 'cil-clock'
      }
    ]
  }
]