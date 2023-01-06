using System.Text.RegularExpressions;
using ForumWebAPI.UserRepos;
using ForumWebAPI.UserDTOs;

namespace ForumWebAPI.RegexCheckers;

public class RegexChecker{
    private List<User> userList;
    public RegexChecker(List<User> userList){
        this.userList = userList;
    }
    public bool CheckUser(RegisterUserDTO user){
        bool IsValid = true;
        if(user == null){
            IsValid = false;
            return IsValid;
        } else if(!user.Email.Contains("@") || !user.Email.Contains(".") || PreventAttack(user.Email)){
            IsValid = false;
            return IsValid;
        } else if (CheckRegex(user.Name) || CheckRegex(user.Surname) || CheckRegex(user.Country)){
            IsValid = false;
            return IsValid;
        } else if (PreventAttack(user.Name) || PreventAttack(user.Surname) || PreventAttack(user.Country) || PreventAttack(user.Username) || PreventAttack(user.Password)){
            IsValid = false;
            return IsValid;
        }
        return IsValid;
    }
    
    public bool PreventDoppelganger(RegisterUserDTO user){
        bool IsValid = true;
        if(userList.Count == 0){
            return true;
        }
        foreach(User u in userList){
            if(u.Username.Equals(user.Username)){
                IsValid = false;
                return IsValid;
            }
            if(u.Email.Equals(user.Email)){
                IsValid = false;
                return IsValid;
            }
        }
        return IsValid;
    }

    private bool CheckRegex(string s){
        bool IsBadString = true;
        if(string.IsNullOrEmpty(s)){
            return IsBadString;
        } else if (!Regex.IsMatch(s, @"(^[a-zA-Z]+$)|(^[a-zA-Z]-[a-zA-Z]$)")){
            return IsBadString;
        }
        foreach (char c in s){
            if(!Char.IsLetter(c)){
                if(c == '-'){
                    continue;
                }
                return IsBadString;
            }
        }
        IsBadString = false;
        return IsBadString;
    }

    private bool PreventAttack(string s){
        bool IsBadString = true;
        if(string.IsNullOrEmpty(s)){
            return IsBadString;
        } else if (s.Contains("'") || s.Contains(">") || s.Contains("<") || s.Contains("/") || s.Contains("\\")){
            return IsBadString;
        }
        IsBadString = false;
        return IsBadString;
    }
}