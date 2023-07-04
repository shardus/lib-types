{
  description = "Shardus type definitions";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    self,
    nixpkgs,
    utils,
  }:
    utils.lib.eachDefaultSystem
    (system: let
      pkgs = import nixpkgs {
        inherit system;
      };
    in {
      # `nix develop` or direnv
      devShell = pkgs.mkShell {
        packages = with pkgs.nodePackages; [
          typescript-language-server
          vscode-langservers-extracted
          prettier
        ];
      };
    });
}
