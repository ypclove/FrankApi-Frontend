/**
 * @see https://umijs.org/docs/max/access#access
 * @param initialState 初始状态
 */
export default function access(initialState: InitialState | undefined) {
  const { loginUser } = initialState ?? {};
  return {
    canAdmin: loginUser && loginUser.userRole === 0
  };
}
