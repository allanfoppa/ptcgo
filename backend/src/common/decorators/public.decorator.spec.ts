import { SetMetadata } from '@nestjs/common';
import { Public, IS_PUBLIC_KEY } from './public.decorator'; // Adjust path if needed

describe('Public Decorator', () => {
  it('should set the IS_PUBLIC_KEY metadata to true', () => {
    // Create a dummy class and apply the decorator
    class TestClass { }
    Public()(TestClass); // Apply the decorator

    // Use Reflect.getMetadata to retrieve the metadata
    const isPublic = Reflect.getMetadata(IS_PUBLIC_KEY, TestClass);

    // Assert that the metadata is set to true
    expect(isPublic).toBe(true);
  });


  it('should work when used as a method decorator', () => {
    class TestClass {
      @Public()
      testMethod() { }
    }

    const isPublic = Reflect.getMetadata(IS_PUBLIC_KEY, TestClass.prototype.testMethod);
    expect(isPublic).toBe(true);
  });

  it('should not affect other metadata', () => {
    class TestClass {
      @SetMetadata('testKey', 'testValue')
      @Public()
      testMethod() { }
    }

    const testValue = Reflect.getMetadata('testKey', TestClass.prototype.testMethod);
    const isPublic = Reflect.getMetadata(IS_PUBLIC_KEY, TestClass.prototype.testMethod);

    expect(testValue).toBe('testValue');
    expect(isPublic).toBe(true);
  });

  it('should not overwrite existing metadata', () => {
    class TestClass {
      @SetMetadata(IS_PUBLIC_KEY, false)
      @Public()
      testMethod() { }
    }

    const isPublic = Reflect.getMetadata(IS_PUBLIC_KEY, TestClass.prototype.testMethod);
    expect(isPublic).toBe(true); // Public should override previous value
  });

});
