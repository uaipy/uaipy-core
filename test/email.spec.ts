import Email from '../src/domain/model/email';
import {describe, expect, it} from '@jest/globals';

describe('Email', () => {
  describe('validate', () => {
    it('should return true for valid email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user.name+tag+sorting@example.com',
        'user.name@example.co.uk',
        'user_name@example.org',
        'username@example.net',
      ];

      validEmails.forEach(email => {
        expect(Email.validate(email)).toBe(true);
      });
    });

    it('should return false for invalid email addresses', () => {
      const invalidEmails = [
        'plainaddress',
        '@missingusername.com',
        'username@.missingdomain.com',
        'username@missingtld.',
        'username@domain..com',
        'username@domain,com',
        'username@domain@domain.com',
        'username@domain@domain.com',
      ];

      invalidEmails.forEach(email => {
        expect(Email.validate(email)).toBe(false);
      });
    });

    it('should return false for email addresses with spaces', () => {
      const emailsWithSpaces = [
        'test@ example.com',
        ' test@example.com',
        'test@example .com',
        'test@ example .com',
      ];

      emailsWithSpaces.forEach(email => {
        expect(Email.validate(email)).toBe(false);
      });
    });

    it('should return false for email addresses with special characters', () => {
      const emailsWithSpecialChars = [
        'test@exam!ple.com',
        'test@ex#ample.com',
        'test@exa$mple.com',
        'test@exam%ple.com',
      ];

      emailsWithSpecialChars.forEach(email => {
        expect(Email.validate(email)).toBe(false);
      });
    });
  });
});