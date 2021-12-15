import {render, screen} from '@testing-library/react'
import {mocked} from 'jest-mock'
import {useSession} from 'next-auth/client'
import {SignInButton} from '.'

jest.mock('next-auth/client')

describe('SingInButton component',() => {
  it('renders corrently when user is not authenticated',() => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    render(
      <SignInButton />
    )

    expect(screen.getByText('Sign in with GitHub'))

  })

  it('renders corrently when user is authenticated', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([
      {
        user: {
          name: 'Jonh Doe',
          email: 'jonh.doe@example.com'
        },
        expires: 'fake-expires'
      },
      false
    ])

    render(
      <SignInButton />
    )

    expect(screen.getByText('Jonh Doe')).toBeInTheDocument()

  })
})
